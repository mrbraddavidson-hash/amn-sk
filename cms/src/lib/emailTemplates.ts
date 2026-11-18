// Plain, accessible HTML emails. Anything an applicant typed is escaped before it goes into HTML.

export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const oneLine = (value: unknown) => String(value ?? '').replace(/[\r\n]+/g, ' ').trim()

const ROLE_LABELS: Record<string, string> = { mentor: 'mentor', mentee: 'mentee' }

function layout(heading: string, bodyHtml: string): string {
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1e293b;line-height:1.55;font-size:15px">
<h2 style="color:#0c4a6e;font-size:20px;margin:0 0 16px">${escapeHtml(heading)}</h2>
${bodyHtml}
<hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0">
<p style="font-size:12px;color:#64748b;margin:0">Mentor Network (AMN-SK) · Saskatchewan Clinical Mentorship Program</p>
</div>`
}

export function applicationReceivedEmail(args: { fullName: string; requestedRole?: string }) {
  const role = ROLE_LABELS[args.requestedRole || ''] || 'member'
  return {
    subject: 'We received your Mentor Network application',
    html: layout(
      'Thank you for applying',
      `<p>Hello ${escapeHtml(args.fullName)},</p>
<p>We have received your application to join the Mentor Network (AMN-SK) as a ${escapeHtml(role)}. Our team will review it and be in touch.</p>
<p>If you did not submit this application, you can ignore this message.</p>`,
    ),
  }
}

export function welcomeSetPasswordEmail(args: { fullName: string; setPasswordUrl: string; loginUrl: string }) {
  return {
    subject: 'Welcome to the Mentor Network — set your password',
    html: layout(
      'Your application was approved',
      `<p>Hello ${escapeHtml(args.fullName)},</p>
<p>Welcome to the Mentor Network. Please choose a password for your account:</p>
<p><a href="${escapeHtml(args.setPasswordUrl)}" style="display:inline-block;background:#0369a1;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:bold">Set my password</a></p>
<p>This link works for 7 days. After that, use "Forgot your password?" on the sign-in page to get a new one.</p>
<p>Then sign in at <a href="${escapeHtml(args.loginUrl)}">${escapeHtml(args.loginUrl)}</a>.</p>`,
    ),
  }
}

export function adminNewApplicationEmail(args: {
  fullName: string
  email: string
  requestedRole?: string
  organization?: string
  adminUrl: string
}) {
  return {
    subject: `New membership application: ${oneLine(args.fullName).slice(0, 80)}`,
    html: layout(
      'New membership application',
      `<p>A new application is waiting for review.</p>
<table style="border-collapse:collapse;font-size:14px">
<tr><td style="padding:2px 12px 2px 0;color:#64748b">Name</td><td>${escapeHtml(args.fullName)}</td></tr>
<tr><td style="padding:2px 12px 2px 0;color:#64748b">Email</td><td>${escapeHtml(args.email)}</td></tr>
<tr><td style="padding:2px 12px 2px 0;color:#64748b">Role</td><td>${escapeHtml(args.requestedRole || '')}</td></tr>
<tr><td style="padding:2px 12px 2px 0;color:#64748b">Organization</td><td>${escapeHtml(args.organization || '')}</td></tr>
</table>
<p><a href="${escapeHtml(args.adminUrl)}">Review it in the admin</a> (sign-in required).</p>`,
    ),
  }
}
