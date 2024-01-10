import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateWarrantyDto } from './dto/warranty.dto';
import {
  AddressesWarranty,
  Prisma,
  ProductsWarranty,
  Warranty,
  WarrantyCompanies,
  WarrantyRegistrationInfo,
} from '@prisma/client';
import { CreateWarrantyRegistrationDto } from './dto/warrantyRegistration.dto';
import { CreateAddressesWarrantyDto } from './dto/warrantyAddresses.dto';
import { CreateCompleteWarrantyDto } from './dto/completeWarranty.dto';
import { CreateProductsWarrantyDto } from './dto/productsWarranty.dto';
import { CreateWarrantyCompaniesDto } from './dto/warrantyCompanies.dto';
import { UpdateWarrantyDto, WarrantyDto } from './dto/update-warranty.dto';
import { UserService } from '../user/user.service';
import { UserUpdateDto } from '../user/dto/user.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

type Addresses = {
  addresses: AddressesWarranty[];
};

type Products = {
  products: Omit<ProductsWarranty, 'warrantyId'>[];
};

type Companies = {
  companies: WarrantyCompanies;
};

type CompleteWarranty = Omit<Warranty, 'id'> &
  Addresses &
  WarrantyRegistrationInfo &
  Products &
  Companies;

@Injectable()
export class WarrantyService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCompleteWarrantyDto): Promise<CompleteWarranty> {
    try {
      return this.prisma.$transaction(
        async (tx) => {
          const warrantyData: CreateWarrantyDto = {
            authorId: dto.authorId,
            // approvalDate: dto.approvalDate,
            caseOrigin: dto.caseOrigin,
            comments: dto.comments,
            // priority: dto.priority,
            responsibleEngineerId: dto.responsibleEngineerId,
          };

          const newWarranty = await this.createWarranty(warrantyData, tx);
          const warrantyRegistrationData: CreateWarrantyRegistrationDto = {
            warrantyId: newWarranty.id,
            email: dto.email,
            name: dto.name,
            cnpj: dto.cnpj,
            cpf: dto.cpf,
            onSiteContact: dto.onSiteContact,
            onSiteContactNumber: dto.onSiteContactNumber,
            phoneNumber: dto.phoneNumber,
            finalClientName: dto.finalClientName,
            finalClientNumber: dto.finalClientNumber,
          };
          const newWarrantyRegistration = await this.createWarrantyRegistration(
            warrantyRegistrationData,
            tx,
          );
          const newAddressesWarranty: AddressesWarranty[] = [];
          for (const address of dto.addresses) {
            const AddressWarrantyData: CreateAddressesWarrantyDto = {
              addressId: address.addressId,
              warrantyId: newWarranty.id,
              type: address.type,
            };
            newAddressesWarranty.push(
              await this.createAddressesWarranty(AddressWarrantyData, tx),
            );
          }

          const newProductsWarranty: ProductsWarranty[] = [];
          for (const product of dto.products) {
            const productsWarrantyData: CreateProductsWarrantyDto = {
              fault: [...product.fault],
              faultDescription: product.faultDescription,
              model: product.model,
              serialNumber: product.serialNumber,
              warrantyId: newWarranty.id,
            };
            newProductsWarranty.push(
              await this.createProductsWarranty(productsWarrantyData, tx),
            );
          }

          const warrantyCompaniesData: CreateWarrantyCompaniesDto = {
            warrantyId: newWarranty.id,
            distributorId: dto.distributorId,
            distributorPhoneNumber: dto.distributorPhoneNumber,
            integratorId: dto.integratorId,
            integratorName: dto.integratorName,
            integratorPhoneNumber: dto.distributorPhoneNumber,
          };

          const newWarrantyCompanies = await this.createWarrantyCompanies(
            warrantyCompaniesData,
            tx,
          );

          const newCompleteWarranty: CompleteWarranty & { id: number } = {
            ...newWarranty,
            ...newWarrantyRegistration,
            products: [...newProductsWarranty],
            addresses: [...newAddressesWarranty],
            companies: newWarrantyCompanies,
          };

          const { id, ...result } = newCompleteWarranty;

          await tx.userUpdate.create({
            data: {
              userId: dto.authorId,
              warrantyId: newWarranty.id,
              type: 'Creating',
              description: 'Creating warranty',
            },
          });
          return result;
        },
        { isolationLevel: 'Serializable' },
      );
    } catch (err) {
      throw new err
    }
  }

  async createWarranty(
    dto: CreateWarrantyDto,
    tx: Prisma.TransactionClient,
  ): Promise<Warranty> {
    const newWarranty = await tx.warranty.create({
      data: {
        ...dto,
      },
    });

    return newWarranty;
  }

  async createWarrantyRegistration(
    dto: CreateWarrantyRegistrationDto,
    tx: Prisma.TransactionClient,
  ): Promise<WarrantyRegistrationInfo> {
    const newWarrantyRegistration = await tx.warrantyRegistrationInfo.create({
      data: {
        ...dto,
      },
    });

    return newWarrantyRegistration;
  }

  async createAddressesWarranty(
    dto: CreateAddressesWarrantyDto,
    tx: Prisma.TransactionClient,
  ): Promise<AddressesWarranty> {
    const newAddressesWarranty = await tx.addressesWarranty.create({
      data: {
        ...dto,
      },
    });

    return newAddressesWarranty;
  }

  async createProductsWarranty(
    dto: CreateProductsWarrantyDto,
    tx: Prisma.TransactionClient,
  ): Promise<ProductsWarranty> {
    const newProductsWarranty = await tx.productsWarranty.create({
      data: {
        ...dto,
      },
    });

    return newProductsWarranty;
  }

  async createWarrantyCompanies(
    dto: CreateWarrantyCompaniesDto,
    tx: Prisma.TransactionClient,
  ): Promise<WarrantyCompanies> {
    const newWarrantyCompanies = await tx.warrantyCompanies.create({
      data: {
        ...dto,
      },
    });

    return newWarrantyCompanies;
  }

  async updateWarranty(id: number, updateWarrantyDto: UpdateWarrantyDto) {
    const warrantyData: Partial<WarrantyDto> = {
      caseOrigin: updateWarrantyDto.caseOrigin,
      comments: updateWarrantyDto.comments,
      priority: updateWarrantyDto.priority,
      responsibleEngineerId: updateWarrantyDto.responsibleEngineerId,
      reasonToDisapprove: updateWarrantyDto.reasonToDisapprove,
      warrantyType: updateWarrantyDto.warrantyType,
    };

    return this.prisma.warranty.update({
      where: {
        id,
      },
      data: {
        ...warrantyData,
      },
    });
  }
  async findAll() {
    return this.prisma.warranty.findMany({
      orderBy: {
        id: 'asc',
      },
      include: {
        usersUpdates: {
          select: {
            status: true,
            visibleStatus: true,
            description: true,
            updatedAt: true,
            user: {
              select: {
                id: true,
                name: true,
                group: {
                  select: {
                    department: true
                  }
                }
              },
            }
          },
        },
        author: {
          select: {
            name: true,
            lastName: true,
            group: {
              select: {
                title: true,
                department: true,
                description: true,
              },
            },
          },
        },
        documentation: true,
        productsWarranty: true,
        registration: {
          include: {
            addressesWarranty: true,
            warrantyCompanies: {
              select: {
                distributor: true,
              },
            },
          },
        },
        repairInfo: true,
        responsibleEngineer: {
          select: {
            name: true,
            lastName: true,
            group: {
              select: {
                title: true,
                department: true,
                description: true,
              },
            },
          },
        },
        testList: {
          include: {
            tests: true,
          },
        },
      },
    });
  }


  async findNotApproved() {
    return this.prisma.warranty.findMany({
      where: {
        approvalDate: null,
      },
      orderBy: {
        id: 'asc',
      },
      include: {
        usersUpdates: {
          select: {
            status: true,
            visibleStatus: true,
            description: true,
            updatedAt: true,
          },
        },
        author: {
          select: {
            name: true,
            lastName: true,
            group: {
              select: {
                title: true,
                department: true,
                description: true,
              },
            },
          },
        },
        documentation: true,
        productsWarranty: true,
        registration: {
          include: {
            addressesWarranty: true,
            warrantyCompanies: {
              select: {
                distributor: true,
              },
            },
          },
        },
        repairInfo: true,
        responsibleEngineer: {
          select: {
            name: true,
            lastName: true,
            group: {
              select: {
                title: true,
                department: true,
                description: true,
              },
            },
          },
        },
        testList: {
          include: {
            tests: true,
          },
        },
      },
    });
  }


  async findOne(id: number) {
    return this.prisma.warranty.findUnique({
      where: {
        id,
      },
      include: {
        usersUpdates: {
          select: {
            status: true,
            visibleStatus: true,
            description: true,
            updatedAt: true,
          },
        },
        author: {
          select: {
            name: true,
            lastName: true,
            group: {
              select: {
                title: true,
                department: true,
                description: true,
              },
            },
          },
        },
        documentation: true,
        productsWarranty: true,
        registration: {
          include: {
            addressesWarranty: true,
            warrantyCompanies: {
              select: {
                distributor: true,
              },
            },
          },
        },
        repairInfo: true,
        responsibleEngineer: {
          select: {
            name: true,
            lastName: true,
            group: {
              select: {
                title: true,
                department: true,
                description: true,
              },
            },
          },
        },
        testList: {
          include: {
            tests: true,
          },
        },
      },
    });
  }
}
