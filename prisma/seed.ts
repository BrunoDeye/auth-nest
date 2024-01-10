// import { batteries } from './batteries';
// import { brands } from './brands';
// import { grids } from './grids';
// import { inverters } from './inverters'
// import { allInOnes } from './allInOnes'
// import { updatedInverters } from './updatedInverters';
import { PrismaClient } from '@prisma/client'
import productsData from './products';
import { testTypes } from './testTypes';

const prisma = new PrismaClient();
// const result = await prisma.$queryRaw`DROP TABLE _prisma_migrations;`

async function main(){
    // for (const test of testTypes) {
    //     await prisma.testType.create({
    //         data: test
    //     })
    // }
    // for (const brand of brands) {
    //     await prisma.brand.create({
    //         data: brand
    //     })
    // }
    // for (const battery of batteries) {
    //     await prisma.battery.create({
    //         data: battery
    //     })
    // }
    // for (const allInOne of allInOnes) {
    //     await prisma.allInOne.create({
    //         data: allInOne
    //     })
    // }

    // for (const updatedInverter of updatedInverters) {
    // await prisma.inverter.update({
    //     ...updatedInverter
    // })}
} // npx prisma db seed -- --environment development

main().catch(e => {
    console.log(e);
    process.exit(1)
}).finally(() => {
    prisma.$disconnect();
})