export async function sendEmail(options: {
  to: string
  subject: string
  text: string
  html?: string
}) {
  const resend = useResend()

  return await resend.emails.send({
    from: 'NuxtProMax <no-reply@baiwumm.com>',
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  })
}
