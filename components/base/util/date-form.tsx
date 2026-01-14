/*
jonobase by @joncoded (aka @jonchius)
/app/components/util/date-form.tsx
date formatting functions
*/

export default function getFormattedDate( { date, timezone = 'Etc/UTC', locale = 'sv-SE', time = false } : { date: any, timezone?: string, locale?: string, time?: boolean }) {

  const newDate = new Date(Date.parse(date))
  let format = {}

  if (time)
    format = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', timeZone: timezone }
  else 
    format = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: timezone }
  
  return new Intl.DateTimeFormat(locale, format).format(newDate)

}

