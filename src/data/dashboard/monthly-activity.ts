import { db } from "@/lib/db"
import { IMonthlyActivity } from "@/lib/types"

export async function getMonthlyActivity() {
     const now = new Date()
     const start = new Date(now.getFullYear(),now.getMonth() - 5,1)
     const [resumes, coverLetters, users, templates, categories] = await Promise.all([
          db.resume.findMany({
               where: { createdAt: { gte: start } },
               select: { createdAt: true }
          }),
          db.coverLetter.findMany({
               where: { createdAt: { gte: start } },
               select: { createdAt: true }
          }),
          db.user.findMany({
               where: { createdAt: { gte: start } },
               select: { createdAt: true }
          }),
          db.resumeTemplate.findMany({
               where: { createdAt: { gte: start } },
               select: { createdAt: true }
          }),
          db.resumeTemplateCategory.findMany({
               where: { createdAt: { gte: start } },
               select: {createdAt: true},
          }),
     ])
     const map = new Map<string,IMonthlyActivity>()
     const getMonthKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}`
     const getMonthLabel = (date: Date) => new Date( date.getFullYear(), date.getMonth(), 1).toISOString()
     for (let i = 5; i >= 0; i--) {
          const d = new Date( now.getFullYear(), now.getMonth() - i, 1)
          const key = getMonthKey(d)
          map.set(key, {
               date: getMonthLabel(d),
               resumes: 0,
               coverLetters: 0,
               users: 0,
               templates: 0,
               categories: 0
          })
     }
     for (const item of resumes) {
          const key = getMonthKey(item.createdAt)
          const existing = map.get(key)
          if (existing) existing.resumes++
     }
     for (const item of coverLetters) {
          const key = getMonthKey(item.createdAt)
          const existing = map.get(key)
          if (existing) existing.coverLetters++
     }
     for (const item of users) {
          const key = getMonthKey(item.createdAt)
          const existing = map.get(key)
          if (existing) existing.users++
     }
     for (const item of templates) {
          const key = getMonthKey(item.createdAt)
          const existing = map.get(key)
          if (existing) existing.templates++
     }
     for (const item of categories) {
          const key = getMonthKey(item.createdAt)
          const existing = map.get(key)
          if (existing) existing.categories++
     }
     return Array.from(map.values())
}