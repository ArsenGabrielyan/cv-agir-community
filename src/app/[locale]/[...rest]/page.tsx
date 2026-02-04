import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import {notFound} from 'next/navigation';

export const generateMetadata = async(): Promise<Metadata> => {
  const t = await getTranslations("not-found");
  return {
    title: t("title")
  }
}

export default function CatchAllPage() {
  notFound();
}