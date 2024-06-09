# Contribution Guidelines for Open Hive

Thank you for your interest in contributing to Open Hive! This platform thrives on the contributions of developers, designers, documentarians, and open-source enthusiasts like you. Your contributions help us build a more vibrant, accessible, and collaborative open-source community. Below, you'll find guidelines on how to contribute effectively to Open Hive.

## Ways to Contribute

There are many ways to contribute to Open Hive, including but not limited to:

- **Code Contributions:** Submit bug fixes, add new features, or improve existing ones.
- **Documentation:** Help improve or translate the documentation.
- **Design:** Contribute to the user interface design or graphics.
- **Feedback:** Provide feedback on the platform's usability, features, and functionality.
- **Community Support:** Help new users navigate and use the platform effectively.

## Getting Started

1. **Fork the Repository:** Start by forking the Open Hive repository on GitHub to your personal account.

2. **Clone Your Fork:** Clone your fork to your local machine to start making changes.

```

git clone https://github.com/your-username/open-hive.git

```

3. **Set Up Your Development Environment:** Follow the setup instructions in the README file to get your development environment ready.

4. **Create a New Branch:** Before making any changes, create a new branch for your work.

```

git checkout -b your-branch-name

```

## Making Changes

1. **Keep Changes Small and Focused:** Aim for small, focused changes that address specific issues or improvements. This makes your contributions easier to review and merge.

2. **Follow the Coding Standards:** Ensure your code adheres to the coding standards and practices established in the project.

3. **Test Your Changes:** Before submitting your changes, thoroughly test them to ensure they work as expected and do not introduce new issues.

## Submitting Your Contributions

1. **Commit Your Changes:** Use meaningful commit messages that clearly describe what your changes entail.

```

git commit -m "Add a concise and descriptive commit message"

```

2. **Push to Your Fork:** Push your changes to your fork on GitHub.

```

git push origin your-branch-name

```

3. **Create a Pull Request:** Go to the Open Hive repository on GitHub and create a new pull request. Provide a clear title and description for your pull request, explaining the changes you've made and why.

4. **Respond to Feedback:** Once your pull request is submitted, the project maintainers may provide feedback. Be open to making further adjustments based on their suggestions.

## Setting Up Cloudflare and MailerSend

Open Hive uses Cloudflare for bucket storage and MailerSend for email sending. To contribute to the project, you'll need to set up your own Cloudflare and MailerSend accounts and obtain the necessary keys.

### Cloudflare Setup

1. Sign up for a Cloudflare account at [https://www.cloudflare.com/](https://www.cloudflare.com/).
2. Create a new bucket for your Open Hive development environment.
3. Obtain your Cloudflare API key and bucket name.
4. Add your Cloudflare API key and bucket name to the `.env` file.<br>
   cc: [read more on how to setup Cloudflare](https://developers.cloudflare.com/r2/get-started/)

### MailerSend Setup

1. Sign up for a MailerSend account at [https://www.mailersend.com/](https://www.mailersend.com/).
2. Obtain your MailerSend API key.
3. Add your MailerSend API key to the `.env` file. <br>
   cc: [read more on how to setup Mailer send](https://www.mailersend.com/help/smtp-relay)

## Code of Conduct

Open Hive is committed to fostering a welcoming and inclusive community. All contributors are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md), which promotes respect, kindness, and collaboration. By contributing to Open Hive, you agree to abide by its terms.

## Questions or Suggestions?

If you have any questions or suggestions on how to improve these contribution guidelines, please feel free to open an issue or submit a pull request with your recommendations.

Thank you for contributing to Open Hive! Together, we can make this platform an even better resource for the open-source community.
