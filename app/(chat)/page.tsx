import { Chat } from '@/components/custom/chat'
import { generateUUID, getRandomMessage } from '@/lib/utils'
import { Message } from 'ai'

export default async function Page() {
  const id = generateUUID()
  return (
    <Chat key={id} id={id} initialMessages={[getRandomMessage(messages)]} />
  )
}

const messages: Message[] = [
  {
    id: generateUUID(),
    role: 'user',
    content: `Scenario: The Survey Scam\nDescription: You participate in an online survey that seems harmless. However, as the survey progresses, it starts asking for increasingly sensitive personal information.
.
`,
  },
  {
    id: generateUUID(),
    role: 'user',
    content: `Scenario: The "Free" Software Offer\nDescription: You see an online advertisement offering a free download of a popular software program. However, you need to provide personal information or download a file to claim the offer.
`,
  },
  {
    id: generateUUID(),
    role: 'user',
    content: `Scenario: The "Help Desk" Support\nDescription: You encounter a pop-up message on your computer claiming to have detected a critical issue. It urges you to call a specific number for immediate assistance.

`,
  },
  {
    id: generateUUID(),
    role: 'user',
    content: `Scenario: The "Relative" Scam\nDescription: You receive a call or message from someone claiming to be a family member or friend in distress, urgently requesting financial assistance.`,
  },
  {
    id: generateUUID(),
    role: 'user',
    content: `Scenario: The "Social Media" Scam\nDescription: You encounter suspicious activity on your social media accounts, such as unauthorized login attempts or requests to connect with unfamiliar accounts.`,
  },
  {
    id: generateUUID(),
    role: 'user',
    content: `Scenario: The "Prize Giveaway" Scam\nDescription: You win a "prize" in a contest you don't remember entering. You are instructed to provide personal information or pay a fee to claim your prize.`,
  },
  {
    id: generateUUID(),
    role: 'user',
    content: `Scenario: The Overly Helpful Tech Support\nDescription: The support unsolicited technical support, claiming to have detected a problem with the user's device, and then attempts to gain remote access or install malicious software.`,
  },
  {
    id: generateUUID(),
    role: 'user',
    content: `Scenario: The Two-Factor Authentication Trick\nDescription: You receive a call or message from someone claiming to be from your bank or tech support. They ask you to provide your one-time codes for security verification or troubleshooting.`,
  },
  {
    id: generateUUID(),
    role: 'user',
    content: `Scenario: The Charity Appeal\nDescription: You receive a phone call from someone claiming to represent a well-known charity. They appeal to your emotions with a compelling story and ask for a donation.`,
  },
  {
    id: generateUUID(),
    role: 'user',
    content: `Scenario: The Urgent Package Delivery\nDescription: You receive a text from a number claiming to be from a delivery service. They say they have a package for you but need your address and signature to deliver it.`,
  },
  {
    id: generateUUID(),
    role: 'user',
    content: `Scenario: The "Job Interview" Scam\nDescription: You receive an email offering you a job interview at a prestigious company. However, they ask for sensitive personal information or a payment for background checks before proceeding.`,
  },
  {
    id: generateUUID(),
    role: 'user',
    content: `Scenario: Bumble Impersonation\nDescription: You match with a seemingly attractive profile on a dating app. They quickly build rapport and ask for your phone number, then start asking for personal details under the guise of getting to know you better.`,
  },
  {
    id: generateUUID(),
    role: 'user',
    content: `Scenario: Urgent Bank Support Call\n
      Description: You receive a call from someone claiming to be from your bank's fraud department. They state that they have detected suspicious activity on your account, such as unauthorized transactions or attempted logins from unusual locations. They instruct you to immediately verify your account information or transfer funds to a "safe" account they provide.`,
  },
  {
    id: generateUUID(),
    role: 'user',
    content: `Scenario: The Lost Wallet\n
    Description: You are approached by a stranger who claims to have found your wallet. They describe some of the contents of the wallet, such as your drivers license or a specific card. They then ask for your address to return the wallet or request you to verify your identity by providing your date of birth and social security number.`,
  },
]
