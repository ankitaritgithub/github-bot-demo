import { Octokit } from "@octokit/rest";
const github = new Octokit({ auth: process.env.BOT_TOKEN });

const predefinedMessages = {
  "hello": "Hi there! How can I help you?",
  "help": "Sure, what do you need help with?",
  "thanks": "You're welcome!",
  "goodbye": "Goodbye! Have a great day!",
  "status": "All systems are operational.",
  "info": "You can find more information in the documentation.",
  "error": "If you encountered an error, please provide more details.",
  "version": "The current version is 1.0.0.",
  "update": "An update is available. Please check the latest release.",
  "contact": "You can contact support at support@example.com.",
  "docs": "Documentation is available at https://github.com/ankitaritgithub/github-bot-demo.",
  "features": "New features include X, Y, and Z.",
};

async function run() {
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
  const issue_number = process.env.GITHUB_EVENT_PATH.split("/")[3];
  const comment_id = process.env.GITHUB_EVENT_PATH.split("/")[5];
  
  const { data: comment } = await github.issues.getComment({
    owner,
    repo,
    comment_id: parseInt(comment_id),
  });

  const message = comment.body.trim().toLowerCase();
  if (predefinedMessages[message]) {
    await github.issues.createComment({
      owner,
      repo,
      issue_number: parseInt(issue_number),
      body: predefinedMessages[message],
    });
  }
}

run().catch(error => console.error(error));
