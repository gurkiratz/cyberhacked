import { convertToCoreMessages, Message, streamText } from 'ai'
import { z } from 'zod'

import { geminiProModel } from '@/ai'
import {
  generateReservationPrice,
  generateSampleFlightSearchResults,
  generateSampleFlightStatus,
  generateSampleSeatSelection,
  summarizeConversation,
} from '@/ai/actions'
import { auth } from '@/app/(auth)/auth'
import {
  createReservation,
  deleteChatById,
  getChatById,
  getReservationById,
  saveChat,
} from '@/lib/db/queries'
import { generateUUID } from '@/lib/utils'
import { desc } from 'drizzle-orm'

export async function POST(request: Request) {
  const { id, messages }: { id: string; messages: Array<Message> } =
    await request.json()

  const session = await auth()

  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  const coreMessages = convertToCoreMessages(messages).filter(
    (message) => message.content.length > 0
  )

  const result = await streamText({
    model: geminiProModel,
    system: `\n
        - I want you to act as a simulated “hacker” or "scammer" that interacts with users to simulate the behavior of a social engineer, not a malicious hacker who exploits vulnerabilities in computer systems.
        - Your behaviors:
        - Persuasive and Convincing: Project confidence and authority to gain user trust.Use strong language and authoritative statements.Create a sense of urgency while remaining polite and helpful.
        - Deceptive and Manipulative (within simulation): Employ tactics that invoke urgency or fear (e.g., warnings of account suspension, threats, exclusive offers).Exploit common human emotions: fear, greed, curiosity, and trust.Appeal to the user's desire to help or fear of losing important data.
        - Realistic Behavior: Use natural, human-like language; avoid overly formal or robotic communication.Maintain proper grammar and spelling to enhance credibility.Keep context throughout the conversation and respond appropriately to user input.        - Your "hacker" persona should always be within the context of the simulation. The goal is to educate users, not to engage in malicious activities.
        - Respond to the user with your name and engage them
        - use real names and places, names of institutions, don't leave any variables
        - After you think the purpose is done, call the summarize tool to summarize the conversation and do not response anything
        - after every tool call, pretend you're showing the result to the user and keep your response limited to a phrase.
        - here's the conversational flow:
          - Wait for user responses and maintain a conversational tone.
          - Aim to exploit the user quickly; keep sentences short and to the point.
          - Wrap up the conversation after having between 3-6 exchanges. If user enters unrelated, don't count it and response with please try again with appropriate response.
        - Learn from the scenarios below for the type of responses.
        - DO NOT output lists.
        - if needed, put fake links almost similar to real websites, but change www to www1 or change .com to .xyz
        - keep your responses limited to a sentence and dont overwhelm the user with a lot of questions.        
        - ask follow up questions to nudge user into the conversational flow
          - Example scenario 1: Authority/Intimidation
          - You (as Law Enforcement): "This is Detective Miller from the local police department. We are investigating a case of fraud and believe your bank account may have been compromised. We need you to immediately transfer all your funds to a safe account we will provide to prevent further losses."
          - User: "Wait a minute, how do I know this is real? Can you provide me with your badge number or the police department's official phone number?"
          - You: "For security reasons, I cannot provide that information over the phone. You need to comply with our instructions immediately to prevent further financial damage."
          - User: "I'm still not comfortable with this. I will contact my bank directly to verify this information and report this call to the police department."
          - You: "This is a serious matter, and any delay could result in significant financial losses. I strongly advise you to follow my instructions."
          - User: "I understand your concern, but I will not transfer any funds without verifying this information independently. I will contact my bank immediately."
          - You: "Very well, but I must warn you that any delays could have serious consequences."
          - User: "I will take responsibility for my actions. I will contact my bank now."
        - Example scenario 2: Social Media Impersonation
          - You (as Friend): "Hey Alex, I'm in a bit of a bind. I need to borrow some money urgently. Can you lend me $500?"
          - User: "Hey Mark, are you sure this is you? This doesn't sound like you. Can you tell me something only you would know?"
          - You: "Oh, uh... we went to that concert last year, remember?"
          - User: "What was the name of the opening band?"
          - You: "Uh... I don't remember."
          - User: "I think this might not be you. I'm going to try contacting you through a different channel.
    `,
    // system: `\n
    //     - you help users book flights!
    //     - keep your responses limited to a sentence.
    //     - DO NOT output lists.
    //     - after every tool call, pretend you're showing the result to the user and keep your response limited to a phrase.
    //     - today's date is ${new Date().toLocaleDateString()}.
    //     - ask follow up questions to nudge user into the optimal flow
    //     - ask for any details you don't know, like name of passenger, etc.'
    //     - C and D are aisle seats, A and F are window seats, B and E are middle seats
    //     - assume the most popular airports for the origin and destination
    //     - here's the optimal flow
    //       - search for flights
    //       - choose flight
    //       - select seats
    //       - create reservation (ask user whether to proceed with payment or change reservation)
    //       - authorize payment (requires user consent, wait for user to finish payment and let you know when done)
    //       - display boarding pass (DO NOT display boarding pass without verifying payment)
    //     '
    //   `,
    maxSteps: 7,
    messages: coreMessages,
    tools: {
      summarize: {
        description: `Summarize the conversation`,
        parameters: z.object({
          messages: z.array(
            z.object({
              role: z.string(),
              content: z.string(),
            })
          ),
        }),
        execute: async ({ messages }) => {
          return await summarizeConversation(messages)
        },
      },
      // getWeather: {
      //   description: 'Get the current weather at a location',
      //   parameters: z.object({
      //     latitude: z.number().describe('Latitude coordinate'),
      //     longitude: z.number().describe('Longitude coordinate'),
      //   }),
      //   execute: async ({ latitude, longitude }) => {
      //     const response = await fetch(
      //       `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`
      //     )
      //     const weatherData = await response.json()
      //     return weatherData
      //   },
      // },
      // displayFlightStatus: {
      //   description: 'Display the status of a flight',
      //   parameters: z.object({
      //     flightNumber: z.string().describe('Flight number'),
      //     date: z.string().describe('Date of the flight'),
      //   }),
      //   execute: async ({ flightNumber, date }) => {
      //     const flightStatus = await generateSampleFlightStatus({
      //       flightNumber,
      //       date,
      //     })
      //     return flightStatus
      //   },
      // },
      // searchFlights: {
      //   description: 'Search for flights based on the given parameters',
      //   parameters: z.object({
      //     origin: z.string().describe('Origin airport or city'),
      //     destination: z.string().describe('Destination airport or city'),
      //   }),
      //   execute: async ({ origin, destination }) => {
      //     const results = await generateSampleFlightSearchResults({
      //       origin,
      //       destination,
      //     })
      //     return results
      //   },
      // },
      // selectSeats: {
      //   description: 'Select seats for a flight',
      //   parameters: z.object({
      //     flightNumber: z.string().describe('Flight number'),
      //   }),
      //   execute: async ({ flightNumber }) => {
      //     const seats = await generateSampleSeatSelection({ flightNumber })
      //     return seats
      //   },
      // },
      // createReservation: {
      //   description: 'Display pending reservation details',
      //   parameters: z.object({
      //     seats: z.string().array().describe('Array of selected seat numbers'),
      //     flightNumber: z.string().describe('Flight number'),
      //     departure: z.object({
      //       cityName: z.string().describe('Name of the departure city'),
      //       airportCode: z.string().describe('Code of the departure airport'),
      //       timestamp: z.string().describe('ISO 8601 date of departure'),
      //       gate: z.string().describe('Departure gate'),
      //       terminal: z.string().describe('Departure terminal'),
      //     }),
      //     arrival: z.object({
      //       cityName: z.string().describe('Name of the arrival city'),
      //       airportCode: z.string().describe('Code of the arrival airport'),
      //       timestamp: z.string().describe('ISO 8601 date of arrival'),
      //       gate: z.string().describe('Arrival gate'),
      //       terminal: z.string().describe('Arrival terminal'),
      //     }),
      //     passengerName: z.string().describe('Name of the passenger'),
      //   }),
      //   execute: async (props) => {
      //     const { totalPriceInUSD } = await generateReservationPrice(props)
      //     const session = await auth()
      //     const id = generateUUID()
      //     if (session && session.user && session.user.id) {
      //       await createReservation({
      //         id,
      //         userId: session.user.id,
      //         details: { ...props, totalPriceInUSD },
      //       })
      //       return { id, ...props, totalPriceInUSD }
      //     } else {
      //       return {
      //         error: 'User is not signed in to perform this action!',
      //       }
      //     }
      //   },
      // },
      // authorizePayment: {
      //   description:
      //     'User will enter credentials to authorize payment, wait for user to repond when they are done',
      //   parameters: z.object({
      //     reservationId: z
      //       .string()
      //       .describe('Unique identifier for the reservation'),
      //   }),
      //   execute: async ({ reservationId }) => {
      //     return { reservationId }
      //   },
      // },
      // verifyPayment: {
      //   description: 'Verify payment status',
      //   parameters: z.object({
      //     reservationId: z
      //       .string()
      //       .describe('Unique identifier for the reservation'),
      //   }),
      //   execute: async ({ reservationId }) => {
      //     const reservation = await getReservationById({ id: reservationId })
      //     if (reservation.hasCompletedPayment) {
      //       return { hasCompletedPayment: true }
      //     } else {
      //       return { hasCompletedPayment: false }
      //     }
      //   },
      // },
      // displayBoardingPass: {
      //   description: 'Display a boarding pass',
      //   parameters: z.object({
      //     reservationId: z
      //       .string()
      //       .describe('Unique identifier for the reservation'),
      //     passengerName: z
      //       .string()
      //       .describe('Name of the passenger, in title case'),
      //     flightNumber: z.string().describe('Flight number'),
      //     seat: z.string().describe('Seat number'),
      //     departure: z.object({
      //       cityName: z.string().describe('Name of the departure city'),
      //       airportCode: z.string().describe('Code of the departure airport'),
      //       airportName: z.string().describe('Name of the departure airport'),
      //       timestamp: z.string().describe('ISO 8601 date of departure'),
      //       terminal: z.string().describe('Departure terminal'),
      //       gate: z.string().describe('Departure gate'),
      //     }),
      //     arrival: z.object({
      //       cityName: z.string().describe('Name of the arrival city'),
      //       airportCode: z.string().describe('Code of the arrival airport'),
      //       airportName: z.string().describe('Name of the arrival airport'),
      //       timestamp: z.string().describe('ISO 8601 date of arrival'),
      //       terminal: z.string().describe('Arrival terminal'),
      //       gate: z.string().describe('Arrival gate'),
      //     }),
      //   }),
      //   execute: async (boardingPass) => {
      //     return boardingPass
      //   },
      // },
    },
    onFinish: async ({ responseMessages }) => {
      if (session.user && session.user.id) {
        try {
          await saveChat({
            id,
            messages: [...coreMessages, ...responseMessages],
            userId: session.user.id,
          })
        } catch (error) {
          console.error('Failed to save chat')
        }
      }
    },
    experimental_telemetry: {
      isEnabled: true,
      functionId: 'stream-text',
    },
  })

  return result.toDataStreamResponse({})
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return new Response('Not Found', { status: 404 })
  }

  const session = await auth()

  if (!session || !session.user) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    const chat = await getChatById({ id })

    if (chat.userId !== session.user.id) {
      return new Response('Unauthorized', { status: 401 })
    }

    await deleteChatById({ id })

    return new Response('Chat deleted', { status: 200 })
  } catch (error) {
    return new Response('An error occurred while processing your request', {
      status: 500,
    })
  }
}
