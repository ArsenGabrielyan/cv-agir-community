import { ResumeTemplate } from "@db";
import { db } from "../src/lib/db";
import fs from "fs";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function seedResumeTemplates(){
     const data = JSON.parse(fs.readFileSync("./prisma/seed/template.json","utf-8")) as (ResumeTemplate & {category: string})[]
     await db.resumeTemplate.createMany({
          data: await Promise.all(data.map(async template=>{
               const {category,...rest} = template;
               const cat = await db.resumeTemplateCategory.findFirst({
                    where: {
                         name: category
                    }
               })
               if(!cat) return rest
               return ({
                    ...rest,
                    categoryId: cat.id
               })
          })),
          skipDuplicates: true
     })
     console.log('✅ All Resume Templates inserted from JSON file!');
} 

async function seedResumeCategories(){
     // Read JSON file
  const data = JSON.parse(fs.readFileSync('./prisma/seed/template-category.json', 'utf-8')) as ({name: string})[];

  // Insert all records
  await db.resumeTemplateCategory.createMany({
     data,
     skipDuplicates: true
  })

  console.log('✅ All Resume Template categories inserted from JSON file!');
}

async function main() {
     console.log("Seeding Resume Template Categories...")
     await seedResumeCategories();
     await delay(1000)
     console.log("Seeding Resume Templates...")
     await seedResumeTemplates();
     console.log("Seeding Finished!")
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })