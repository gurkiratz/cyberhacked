import { generateObject, Message } from 'ai'
import { z } from 'zod'

import { geminiFlashModel } from '.'

export async function generateSampleFlightStatus({
  flightNumber,
  date,
}: {
  flightNumber: string
  date: string
}) {
  const { object: flightStatus } = await generateObject({
    model: geminiFlashModel,
    prompt: `Flight status for flight number ${flightNumber} on ${date}`,
    schema: z.object({
      flightNumber: z.string().describe('Flight number, e.g., BA123, AA31'),
      departure: z.object({
        cityName: z.string().describe('Name of the departure city'),
        airportCode: z.string().describe('IATA code of the departure airport'),
        airportName: z.string().describe('Full name of the departure airport'),
        timestamp: z.string().describe('ISO 8601 departure date and time'),
        terminal: z.string().describe('Departure terminal'),
        gate: z.string().describe('Departure gate'),
      }),
      arrival: z.object({
        cityName: z.string().describe('Name of the arrival city'),
        airportCode: z.string().describe('IATA code of the arrival airport'),
        airportName: z.string().describe('Full name of the arrival airport'),
        timestamp: z.string().describe('ISO 8601 arrival date and time'),
        terminal: z.string().describe('Arrival terminal'),
        gate: z.string().describe('Arrival gate'),
      }),
      totalDistanceInMiles: z
        .number()
        .describe('Total flight distance in miles'),
    }),
  })

  return flightStatus
}

export async function generateSampleFlightSearchResults({
  origin,
  destination,
}: {
  origin: string
  destination: string
}) {
  const { object: flightSearchResults } = await generateObject({
    model: geminiFlashModel,
    prompt: `Generate search results for flights from ${origin} to ${destination}, limit to 4 results`,
    output: 'array',
    schema: z.object({
      id: z
        .string()
        .describe('Unique identifier for the flight, like BA123, AA31, etc.'),
      departure: z.object({
        cityName: z.string().describe('Name of the departure city'),
        airportCode: z.string().describe('IATA code of the departure airport'),
        timestamp: z.string().describe('ISO 8601 departure date and time'),
      }),
      arrival: z.object({
        cityName: z.string().describe('Name of the arrival city'),
        airportCode: z.string().describe('IATA code of the arrival airport'),
        timestamp: z.string().describe('ISO 8601 arrival date and time'),
      }),
      airlines: z.array(
        z.string().describe('Airline names, e.g., American Airlines, Emirates')
      ),
      priceInUSD: z.number().describe('Flight price in US dollars'),
      numberOfStops: z.number().describe('Number of stops during the flight'),
    }),
  })

  return { flights: flightSearchResults }
}

export async function generateSampleSeatSelection({
  flightNumber,
}: {
  flightNumber: string
}) {
  const { object: rows } = await generateObject({
    model: geminiFlashModel,
    prompt: `Simulate available seats for flight number ${flightNumber}, 6 seats on each row and 5 rows in total, adjust pricing based on location of seat`,
    output: 'array',
    schema: z.array(
      z.object({
        seatNumber: z.string().describe('Seat identifier, e.g., 12A, 15C'),
        priceInUSD: z
          .number()
          .describe('Seat price in US dollars, less than $99'),
        isAvailable: z
          .boolean()
          .describe('Whether the seat is available for booking'),
      })
    ),
  })

  return { seats: rows }
}

export async function generateReservationPrice(props: {
  seats: string[]
  flightNumber: string
  departure: {
    cityName: string
    airportCode: string
    timestamp: string
    gate: string
    terminal: string
  }
  arrival: {
    cityName: string
    airportCode: string
    timestamp: string
    gate: string
    terminal: string
  }
  passengerName: string
}) {
  const { object: reservation } = await generateObject({
    model: geminiFlashModel,
    prompt: `Generate price for the following reservation \n\n ${JSON.stringify(
      props,
      null,
      2
    )}`,
    schema: z.object({
      totalPriceInUSD: z
        .number()
        .describe('Total reservation price in US dollars'),
    }),
  })

  return reservation
}

export async function summarizeConversation(messages: Message[]) {
  // In a real-world scenario, you would call your summarization API here
  // For this example, we'll just concatenate the messages
  const conversation = messages.map((m) => `${m.role}: ${m.content}`).join('\n')
  const { object: summary } = await generateObject({
    model: geminiFlashModel,
    prompt: `
    - Analysze the conversation between the user and scammer.
    - keep your vocabulary easy to understand
      `,
    schema: z.object({
      result: z
        .string()
        .describe(
          "Success if the user did not provide any personal info or Failed - if the user's info is compromised"
        ),
      flags: z
        .array(z.string())
        .describe('List of security red flags identified'),
      rating: z
        .string()
        .describe(
          "Star-based rating system to represent the user's performance"
        ),
      tactics: z
        .array(z.string())
        .max(3)
        .describe('List of social engineering tactics used in the interaction'),
      happen: z
        .array(z.string())
        .max(3)
        .describe(
          'What could have happened if something went wrong or in general even if little info is leaked, what could have happened'
        ),
      improvement: z
        .array(z.string())
        .max(4)
        .describe(
          'Specific and actionable advice on how to better defend against similar situations'
        ),
      resources: z
        .array(z.string())
        .describe('Links to helpful resources on cybersecurity topics'),
    }),
  })
  console.log(summary)
  return summary
}
