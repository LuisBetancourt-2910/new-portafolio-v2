import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  // Get locale from cookie or default to 'es'
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'es';

  let messages;
  if (locale === 'en') {
    messages = (await import('../messages/en.json')).default;
  } else {
    messages = (await import('../messages/es.json')).default;
  }

  return {
    locale,
    messages
  };
});
