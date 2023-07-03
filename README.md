# Robot or Not
https://robot-or-not.vercel.app/

A multiplayer web app developed using Next.js and deployed on Vercel, that challenges users to distinguish between AI-generated and human responses to unique questions.
The tech stack used to develop this project include: JavaScript/TypeScript, Next.js, Node.js, HTML, CSS, MySQL, Prisma, WebSockets, and PlanetScale.

# How a game works: 
1. Create a game lobby, select the number of rounds, and invite friends using a share link.
2. Start the game, and unique questions and their responses will be generated using OpenAI's ChatGPT API.
3. To each player, a different question and it's AI-generated response will be displayed, and they need to provide their own response to the question.
4. After every player writes their response and submits, every player will be shown a question and 2 responses (1 AI-generated, 1 human) from another random player.
5. Each player needs to guess and select the response they think was made by a person.
6. Correctly selecting the human response grants a player 1 point.