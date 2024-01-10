-- CreateEnum
CREATE TYPE "Groups" AS ENUM ('colaborator', 'integrator', 'distributor', 'client');

-- CreateEnum
CREATE TYPE "Departments" AS ENUM ('logistics', 'dispatch', 'maintenance', 'support', 'marketing');

-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('USER', 'ADMIN', 'MANAGER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('WAITING FOR APPROVAL', 'INVERTER TO REPAIR', 'INVERTER TO REPLACE', 'INVERTER CLOSED', 'RETURN BID', 'INVERTER REVERSE PICKUP', 'INVERTER IN TRANSPORT', 'TOTAL LOSS', 'INVERTER RECEIVED', 'WAITING BOARD', 'MI TO REPAIR', 'ABANDONED BY CUSTOMER', 'INVERTER RETURN', 'MI TO REPLACE', 'MI IN TRANSPORT', 'MI RECEIVED', 'MI RETURN', 'MI CLOSED', 'ALDO DEBT', 'WITHOUT IDENTIFICATION', 'BELENERGY DEBT', 'EDELTEC DEBT', 'SOOLLAR DEBT', 'BONIFICAÇÃO', 'DEMONSTRAÇÃO');

-- CreateEnum
CREATE TYPE "VisibleStatus" AS ENUM ('Esperando aprovação', 'Aprovado', 'Recebido na Central Deye', 'Na fila para o reparo', 'Finalizada');

-- CreateEnum
CREATE TYPE "WarrantyType" AS ENUM ('FIX', 'REPLACE', 'COMPENSATION');

-- CreateEnum
CREATE TYPE "Payer" AS ENUM ('CUSTOMER', 'DEYE');

-- CreateEnum
CREATE TYPE "Control" AS ENUM ('CHECK', 'enviar para bel', 'search inverter');

-- CreateEnum
CREATE TYPE "BoardStatus" AS ENUM ('ARRIVED', 'WAITING');

-- CreateEnum
CREATE TYPE "Faults" AS ENUM ('NOISE', 'COMMUNICATION', 'PHISICAL DAMAGE', 'COMM. ERROR', 'AC CONNECTOR', 'STANDBY / SELFCHECK', 'BAD GENERATION', 'DOESNT TURN ON', 'DOESNT GENERATES', 'AC IN SHORT CIRCUIT', 'DOESNT RECOGNIZE AC', 'FAN FAULT', 'PV IN SHORT CIRCUIT', 'KNEADED', 'HEATING', 'LCD', 'PV1', 'PV3', 'PV2', 'F02', 'PV4', 'F01', 'MC4', 'F03', 'F04', 'F05', 'F06', 'F07', 'F08', 'F09', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20', 'F21', 'F22', 'F23', 'F24', 'F25', 'F26', 'F27', 'F28', 'F29', 'F30', 'F31', 'F32', 'F33', 'F34', 'F35', 'F36', 'F37', 'F38', 'F39', 'F40', 'F41', 'F42', 'F43', 'F44', 'F45', 'F46', 'F47', 'F48', 'F49', 'F50', 'F51', 'F52', 'F53', 'F54', 'F55', 'F56', 'F57', 'F58', 'F59', 'F60', 'F61', 'F62', 'F63', 'F64', 'OTHERS', 'LIMITATION');

-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('REGISTRATION', 'PICKUP', 'DELIVERY');

-- CreateEnum
CREATE TYPE "TestStatus" AS ENUM ('ANALYZING', 'APPROVED', 'FAILED');

-- CreateTable
CREATE TABLE "Campaign" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "finishAt" TIMESTAMP(3) NOT NULL,
    "targetGroups" "Groups"[],
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignParticipant" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "assets" TEXT[],
    "points" DOUBLE PRECISION NOT NULL,
    "enroledDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CampaignParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "description" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "title" "Groups" NOT NULL DEFAULT 'integrator',
    "department" "Departments",
    "description" TEXT,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TempAuth" (
    "uuid" TEXT NOT NULL,
    "responsibleEngineerId" INTEGER NOT NULL,
    "groupId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expirationDuration" INTEGER NOT NULL DEFAULT 360,
    "utilizations" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "TempAuth_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "Roles" NOT NULL DEFAULT 'USER',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "groupId" INTEGER,
    "phoneNumber" VARCHAR(15),
    "cnpj" TEXT,
    "cpf" TEXT,
    "openWarrantyToken" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "companyId" INTEGER,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserUpdate" (
    "id" SERIAL NOT NULL,
    "warrantyId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'WAITING FOR APPROVAL',
    "visibleStatus" "VisibleStatus" NOT NULL DEFAULT 'Esperando aprovação',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserUpdate_pkey" PRIMARY KEY ("id","warrantyId","userId")
);

-- CreateTable
CREATE TABLE "Repair" (
    "id" SERIAL NOT NULL,
    "warrantyId" INTEGER NOT NULL,
    "repairDate" TIMESTAMP(3) NOT NULL,
    "repairTechnicianId" INTEGER NOT NULL,
    "maintenanceControl" "Control",

    CONSTRAINT "Repair_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaitingBoard" (
    "repairId" INTEGER NOT NULL,
    "boardId" INTEGER NOT NULL,
    "status" "BoardStatus" NOT NULL DEFAULT 'WAITING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WaitingBoard_pkey" PRIMARY KEY ("repairId","boardId")
);

-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documentation" (
    "id" SERIAL NOT NULL,
    "warrantyId" INTEGER NOT NULL,
    "invoice" TEXT,
    "sentBackup" BOOLEAN NOT NULL DEFAULT false,
    "invoiceReturn" TEXT,
    "returnDate" TIMESTAMP(3),
    "tracking" TEXT,
    "separated" BOOLEAN NOT NULL DEFAULT false,
    "receivingDate" TIMESTAMP(3),
    "requestSeparationDate" TIMESTAMP(3),
    "daySentByCustomer" TIMESTAMP(3),
    "freight" "Payer",

    CONSTRAINT "Documentation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddressesWarranty" (
    "addressId" INTEGER NOT NULL,
    "warrantyId" INTEGER NOT NULL,
    "type" "AddressType" NOT NULL,

    CONSTRAINT "AddressesWarranty_pkey" PRIMARY KEY ("warrantyId","type")
);

-- CreateTable
CREATE TABLE "WarrantyCompanies" (
    "warrantyId" INTEGER NOT NULL,
    "distributorId" INTEGER,
    "distributorPhoneNumber" VARCHAR(15),
    "integratorPhoneNumber" VARCHAR(15),
    "integratorName" TEXT,
    "distributorName" TEXT,

    CONSTRAINT "WarrantyCompanies_pkey" PRIMARY KEY ("warrantyId")
);

-- CreateTable
CREATE TABLE "WarrantyRegistrationInfo" (
    "warrantyId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "cpf" TEXT,
    "cnpj" TEXT,
    "onSiteContact" TEXT,
    "onSiteContactNumber" TEXT,
    "finalClientName" TEXT,
    "finalClientNumber" TEXT,

    CONSTRAINT "WarrantyRegistrationInfo_pkey" PRIMARY KEY ("warrantyId")
);

-- CreateTable
CREATE TABLE "Warranty" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "responsibleEngineerId" INTEGER,
    "caseOrigin" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvalDate" TIMESTAMP(3),
    "reasonToDisapprove" TEXT,
    "warrantyType" "WarrantyType",
    "comments" TEXT,
    "priority" INTEGER,

    CONSTRAINT "Warranty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductsWarranty" (
    "model" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "warrantyId" INTEGER NOT NULL,
    "fault" "Faults"[],
    "faultDescription" TEXT NOT NULL,

    CONSTRAINT "ProductsWarranty_pkey" PRIMARY KEY ("model","warrantyId","serialNumber")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestList" (
    "id" SERIAL NOT NULL,
    "warrantyId" INTEGER NOT NULL,
    "failureDescription" TEXT,

    CONSTRAINT "TestList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" SERIAL NOT NULL,
    "testListId" INTEGER NOT NULL,
    "testTypeId" INTEGER NOT NULL,
    "comments" TEXT,
    "testStatus" "TestStatus" NOT NULL DEFAULT 'ANALYZING',

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestType" (
    "id" SERIAL NOT NULL,
    "productTypeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "isOptional" BOOLEAN NOT NULL,
    "description" TEXT,
    "fault" "Faults"[],

    CONSTRAINT "TestType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileEntity" (
    "id" SERIAL NOT NULL,
    "testId" INTEGER NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FileEntity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_cnpj_key" ON "Company"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Address_companyId_key" ON "Address"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Repair_warrantyId_key" ON "Repair"("warrantyId");

-- CreateIndex
CREATE UNIQUE INDEX "Documentation_warrantyId_key" ON "Documentation"("warrantyId");

-- CreateIndex
CREATE UNIQUE INDEX "Products_model_key" ON "Products"("model");

-- CreateIndex
CREATE UNIQUE INDEX "TestList_warrantyId_key" ON "TestList"("warrantyId");

-- CreateIndex
CREATE UNIQUE INDEX "Test_testListId_testTypeId_key" ON "Test"("testListId", "testTypeId");

-- AddForeignKey
ALTER TABLE "CampaignParticipant" ADD CONSTRAINT "CampaignParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignParticipant" ADD CONSTRAINT "CampaignParticipant_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TempAuth" ADD CONSTRAINT "TempAuth_responsibleEngineerId_fkey" FOREIGN KEY ("responsibleEngineerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TempAuth" ADD CONSTRAINT "TempAuth_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserUpdate" ADD CONSTRAINT "UserUpdate_warrantyId_fkey" FOREIGN KEY ("warrantyId") REFERENCES "Warranty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserUpdate" ADD CONSTRAINT "UserUpdate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repair" ADD CONSTRAINT "Repair_warrantyId_fkey" FOREIGN KEY ("warrantyId") REFERENCES "Warranty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repair" ADD CONSTRAINT "Repair_repairTechnicianId_fkey" FOREIGN KEY ("repairTechnicianId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaitingBoard" ADD CONSTRAINT "WaitingBoard_repairId_fkey" FOREIGN KEY ("repairId") REFERENCES "Repair"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaitingBoard" ADD CONSTRAINT "WaitingBoard_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documentation" ADD CONSTRAINT "Documentation_warrantyId_fkey" FOREIGN KEY ("warrantyId") REFERENCES "Warranty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressesWarranty" ADD CONSTRAINT "AddressesWarranty_warrantyId_fkey" FOREIGN KEY ("warrantyId") REFERENCES "WarrantyRegistrationInfo"("warrantyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressesWarranty" ADD CONSTRAINT "AddressesWarranty_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarrantyCompanies" ADD CONSTRAINT "WarrantyCompanies_warrantyId_fkey" FOREIGN KEY ("warrantyId") REFERENCES "WarrantyRegistrationInfo"("warrantyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarrantyCompanies" ADD CONSTRAINT "WarrantyCompanies_distributorId_fkey" FOREIGN KEY ("distributorId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarrantyRegistrationInfo" ADD CONSTRAINT "WarrantyRegistrationInfo_warrantyId_fkey" FOREIGN KEY ("warrantyId") REFERENCES "Warranty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warranty" ADD CONSTRAINT "Warranty_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warranty" ADD CONSTRAINT "Warranty_responsibleEngineerId_fkey" FOREIGN KEY ("responsibleEngineerId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsWarranty" ADD CONSTRAINT "ProductsWarranty_warrantyId_fkey" FOREIGN KEY ("warrantyId") REFERENCES "Warranty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsWarranty" ADD CONSTRAINT "ProductsWarranty_model_fkey" FOREIGN KEY ("model") REFERENCES "Products"("model") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestList" ADD CONSTRAINT "TestList_warrantyId_fkey" FOREIGN KEY ("warrantyId") REFERENCES "Warranty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_testListId_fkey" FOREIGN KEY ("testListId") REFERENCES "TestList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_testTypeId_fkey" FOREIGN KEY ("testTypeId") REFERENCES "TestType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestType" ADD CONSTRAINT "TestType_productTypeId_fkey" FOREIGN KEY ("productTypeId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileEntity" ADD CONSTRAINT "FileEntity_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

