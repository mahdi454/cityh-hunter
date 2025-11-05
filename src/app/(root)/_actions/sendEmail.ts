import { mailer } from '@/lib/mail';

function createVerificationEmailHtml(
  href: string,
  actionLabel: string,
  buttonText: string
): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 500px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 48px 32px;">
              <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 26px; color: #333333;">
                Hi there,
              </p>

              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 26px; color: #333333;">
                Welcome to City Hunter Store, where we curate a collection of
                exquisite perfumes just for you. Use the button below to ${actionLabel}.
              </p>

              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 0 0 32px 0;">
                <tr>
                  <td align="center" style="padding: 0;">
                    <a href="${href}"
                       style="display: inline-block; background-color: #2563eb; color: #ffffff;
                              text-decoration: none; font-size: 16px; font-weight: 500;
                              padding: 16px 24px; border-radius: 3px;
                              border: none; cursor: pointer;">
                      ${buttonText}
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 26px; color: #333333;">
                All The Best,<br>
                The City Hunter Store Team
              </p>

              <hr style="border: none; border-top: 1px solid #cccccc; margin: 32px 0; padding: 0;">

              <p style="margin: 0; font-size: 12px; line-height: 18px; color: #8898aa;">
                If you did not request this email, you can safely ignore it.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function sendVerificationEmail(userData: any, emailToken: string) {
  const href = `${
    process.env.PUBLIC_SERVER_URL
  }/verify-email?token=${emailToken}&email=${encodeURIComponent(userData.email)}`;

  // Build HTML email template
  const html = createVerificationEmailHtml(href, 'verify your account', 'Verify Account');

  // Send verification email
  await mailer.sendMail({
    from: '"Acme" <no-reply@acme.test>',
    to: userData.email,
    subject: 'Verify Your Email',
    html: html,
  });
}
