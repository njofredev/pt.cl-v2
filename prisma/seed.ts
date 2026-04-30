import "dotenv/config"
import { PrismaClient } from '@prisma/client'
import { PROFESSIONALS } from '../src/data/professionals'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  for (const p of PROFESSIONALS) {
    // Dividimos el nombre para el seed local
    const nameParts = p.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    const professional = await prisma.professional.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        specialty: p.specialty,
        area: p.area,
        description: p.description,
        education: p.education,
        sucursal: p.sucursal,
      },
    })
    console.log(`Created professional with id: ${professional.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
