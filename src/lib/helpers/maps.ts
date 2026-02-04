import { CoverLetter, User, VerificationToken as PrismaVerificationToken  } from "@db";
import { CoverLetterFormType,  ResumeFormType } from "@/schemas/types";
import { AccountServerData, ResumeServerData } from "@/lib/types"
import type { AdapterAccount, AdapterAccountType, AdapterUser, VerificationToken } from "next-auth/adapters"

export const mapToResumeValues = (data: ResumeServerData): ResumeFormType => ({
     id: data.id || undefined,
     title: data.title || undefined,
     description: data?.description || undefined,
     fname: data.fname || undefined,
     lname: data.lname || undefined,
     jobTitle: data.jobTitle || undefined,
     phone: data.phone || undefined,
     address: data.address || undefined,
     profileImg: data.profileImg || undefined,
     email: data.email || undefined,
     links: data.links.map(link=>({
          name: link.name || undefined,
          url: link.url || undefined
     })) || undefined,
     summary: data.summary || undefined,
     experience: data.experience.map(exp=>({
          job: exp.job || undefined,
          company: exp.company || undefined,
          startDate: exp.startDate?.toISOString().split("T")[0],
          endDate: exp.endDate?.toISOString().split("T")[0],
          city: exp.city || undefined,
          jobInfo: exp.jobInfo || undefined
     })) || undefined,
     education: data.education.map(edu=>({
          degree: edu.degree || undefined,
          faculty: edu.faculty || undefined,
          startDate: edu.startDate?.toISOString().split("T")[0],
          endDate: edu.endDate?.toISOString().split("T")[0],
          school: edu.school || undefined,
          city: edu.city || undefined
     })) || undefined,
     courses: data.courses.map(course=>({
          name: course.name || undefined,
          institution: course.institution || undefined,
          startDate: course.startDate?.toISOString().split("T")[0],
          endDate: course.endDate?.toISOString().split("T")[0],
     })) || undefined,
     references: data.references.map(ref=>({
          fullName: ref.fullName || undefined,
          position: ref.position || undefined,
          company: ref.company || undefined,
          phone: ref.phone || undefined,
          email: ref.email || undefined
     })) || undefined,
     skills: data.skills.map(skill=>({
          name: skill.name || undefined,
          percentage: skill.percentage || undefined
     })) || undefined,
     languages: data.languages.map(lang=>({
          name: lang.name || undefined,
          percentage: lang.percentage || undefined
     })) || undefined,
     hobbies: data.hobbies || undefined,
     colorHex: data.colorHex || undefined,
     borderStyle: data.borderStyle || undefined
})

export const mapToLetterValues = (data: CoverLetter): CoverLetterFormType => ({
     id: data.id || undefined,
     title: data.title || undefined,
     description: data?.description || undefined,
     fname: data.fname || undefined,
     lname: data.lname || undefined,
     jobTitle: data.jobTitle || undefined,
     phone: data.phone || undefined,
     address: data.address || undefined,
     profileImg: data.profileImg || undefined,
     email: data.email || undefined,
     recipientName: data.recipientName || undefined,
     recipientTitle: data.recipientTitle || undefined,
     companyName: data.companyName || undefined,
     companyAddress: data.companyAddress || undefined,
     letterContent: data.letterContent || undefined,
     letterDate: data.createdAt || undefined,
     colorHex: data.colorHex || undefined,
     borderStyle: data.borderStyle || undefined
})

export const mapToAdapterUser = (user: User): AdapterUser => {
     if (!user) throw new Error("mapToAdapterUser got undefined!");
     return {
          id: user.id,
          name: user.name,
          email: user.email ?? "",
          emailVerified: user.emailVerified,
          image: user.image,
     }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const mapToAdapterAccount = ({createdAt, updatedAt, user, ...account}: AccountServerData): AdapterAccount => ({
     ...account,
     userId: user.id,
     type: account.type as AdapterAccountType,
     expires_at: account.expires_at ?? undefined,
     access_token: account.access_token ?? undefined,
     id_token: account.id_token ?? undefined,
     refresh_token: account.refresh_token ?? undefined,
     token_type: (account.token_type?.toLowerCase() ?? undefined) as Lowercase<string> | undefined,
     scope: account.scope || undefined,
     session_state: account.session_state || undefined,
})

export const mapToVerificationToken = (token: PrismaVerificationToken): VerificationToken => ({
     identifier: token.email,
     expires: token.expires,
     token: token.token,
})  