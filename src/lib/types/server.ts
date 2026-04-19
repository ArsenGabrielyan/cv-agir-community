import { Prisma } from "@db"

export const auditLogsSelect = {
     id: true,
     userId: true,
     action: true,
     metadata: true,
     createdAt: true,
     user: {
          select: {
               id: true,
               name: true,
               email: true,
               image: true
          }
     }
} satisfies Prisma.AuditLogSelect
export type AuditLogServerData = Prisma.AuditLogGetPayload<{
     select: typeof auditLogsSelect
}>

export const userInclude = {
     cvPageSettings: true,
} satisfies Prisma.UserInclude
export type UserServerData = Prisma.UserGetPayload<{
     include: typeof userInclude
}>

export type AccountServerData = Prisma.AccountGetPayload<{
     include: { user: true }
}>

export const resumeDataSelect = {
     id: true,
     title: true,
     description: true,
     fname: true,
     lname: true,
     jobTitle: true,
     phone: true,
     address: true,
     profileImg: true,
     email: true,
     summary: true,
     hobbies: true,
     colorHex: true,
     borderStyle: true,
     userId: true,
     templateId: true,
     createdAt: true,
     updatedAt: true,
     template: true,
     education: {select: {degree: true, faculty: true, startDate: true, endDate: true, school: true, city: true}},
     experience: {select: {job: true, company: true, startDate: true, endDate: true, city: true, jobInfo: true}},
     languages: {select: {name: true, percentage: true}},
     links: {select: {name: true, url: true}},
     courses: {select: {name: true, institution: true, startDate: true, endDate: true}},
     skills: {select: {name: true, percentage: true}},
     references: {select: {fullName: true, position: true, company: true, phone: true, email: true}}
} satisfies Prisma.ResumeSelect

export type ResumeServerData = Prisma.ResumeGetPayload<{
     select: typeof resumeDataSelect
}>
export const templateDataSelect = {
     id: true,
     locale: true,
     name: true,
     description: true,
     imageName: true,
     htmlTemplate: true,
     cssStyle: true,
     categoryId: true,
     createdAt: true,
     updatedAt: true,
     category: {select: {name: true}}
} satisfies Prisma.ResumeTemplateSelect
export type TemplateServerData = Prisma.ResumeTemplateGetPayload<{
     select: typeof templateDataSelect
}>