import { db } from "@/lib/db";

function calculateDifference(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0
  const diff = Math.floor(((current - previous) / previous) * 100)
  return Math.max(0, Math.min(100, diff))
}

type CountWhere = {
     createdAt?: {
          gte?: Date;
          lt?: Date;
     };
};

const countableModels = {
     user: (where?: CountWhere) => db.user.count({ where }),
     resume: (where?: CountWhere) => db.resume.count({ where }),
     coverLetter: (where?: CountWhere) => db.coverLetter.count({ where }),
     template: (where?: CountWhere) => db.resumeTemplate.count({ where }),
     category: (where?: CountWhere) => db.resumeTemplateCategory.count({ where })
}

export default async function getCountAndDifference(model: keyof typeof countableModels){
     const now = new Date()
     const startOfCurrentMonth = new Date(
          now.getFullYear(),
          now.getMonth(),
          1
     )
     const startOfPreviousMonth = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          1
     )
     const countResource = countableModels[model]

     const [curr, prev, count] =
     await Promise.all([
          countResource({
               createdAt: {
                    gte: startOfCurrentMonth,
               },
          }),
          countResource({
               createdAt: {
                    gte: startOfPreviousMonth,
                    lt: startOfCurrentMonth,
               },
          }),
          countResource(),
     ])
     return {
          count,
          difference: calculateDifference(
               curr,
               prev
          ),
     }
}