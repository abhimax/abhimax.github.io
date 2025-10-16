# Streamlining UI Library Development From Design to Release​

## PART 03 — CI/CD & Release Process

[![Abhiman Ranaweera](https://miro.medium.com/v2/resize:fill:64:64/1*5csW6IzMy7Uq75Y-KjI36w.jpeg)](https://medium.com/@abhimanranaweera?source=post_page---byline--a1a12b521fb6---------------------------------------)

[Abhiman Ranaweera](https://medium.com/@abhimanranaweera?source=post_page---byline--a1a12b521fb6---------------------------------------)
7 min read | Oct 16, 2025

In the previous parts of this series, we discussed the importance of streamlining UI library development and creating an effective design to release process. However, the final stage release often presents the biggest challenges, especially when manual processes and error-prone workflows are in place. In this part, we’ll dive into how we transformed our release process to ensure efficiency, reliability, and better collaboration.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*qOWkStoNuKthRW-6c4cbkA.png)

## The Challenges We Faced

Before implementing a CI/CD pipeline and an automated release process, our team faced several issues that hindered progress

❌ Manual releases were error-prone and time-consuming

❌ No traceability between code and release notes

❌ Lack of automated functionality testing

❌ Inconsistent release communication across teams

❌ Internal testing was limited with early feedback

## Our Solution

To overcome these challenges, we adopted an automated release strategy that drastically improved our process. Here’s how we did it

✅ **Fully automated releases** to eliminate the errors and time lost in manual processes.

✅ **Commit-driven release notes** that automatically generate release notes based on commits, ensuring traceability between code and release documentation.

✅ **Robust unit and integration tests** to ensure all features are functioning correctly before release.

✅ **Automated alerts for transparency** so all stakeholders are kept in the loop regarding release status.

✅ **Pre-merge internal releases** to collect early feedback from internal users, allowing us to identify issues before code is merged to the main branch.

## Pull Request Workflow

The core of our automated workflow begins with the **Pull Request (PR)**. When a developer creates a pull request, the following actions are triggered.

1️⃣ **Lint Check** to ensure coding standards are followed.

2️⃣ **Unit Tests** to verify the basic functionality of the changes.

3️⃣ **Build** to compile the code and ensure there are no build errors.

4️⃣ **SonarQube Analysis** to assess code quality and security issues.

5️⃣ **Integration Tests** to ensure the new changes work well within the application.

📌 **Outcome**: This process ensures that only stable, fully tested, and working features are ready to be released.

![Pull request workflow](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*fQGBQWlR8Oea8ePPwk9Mtg.png)

## Integration Testing Strategy

🎯 **Objective:** We wanted to ensure that our library functions properly in a real-world context not just in unit tests.

### **Approach**

- We maintain a sample **React application** that mimics the real-world usage of our UI library.
- The library is locally built and installed as a dependency in this sample app.
- Tests are written and executed against this application, using actual components and props.

### Why This Matters

- This strategy helps **detect issues that unit tests might miss** (e.g., broken imports, missing styles, rendering bugs).
- It verifies how our library components perform when used in real-world environments.
- This process ensures we have full confidence in the library’s stability before merging changes or releasing them.

![Integration Testing Strategy](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*KMyCo2hX8Hep8jzrYESZkA.png)

## Internal Release Workflow (Optional)

Before we merge everything to the main branch, we sometimes trigger an **Internal Release**. This can be done on-demand from a feature branch and serves as a way to get early feedback from stakeholders and internal testers.

✅ The version is bumped with an **-alpha** or **-beta** suffix.

✅ A **preview version** is created and made available for consumption.

✅ The preview version is **deployed to a temporary Storybook instance**, allowing teams to interact with the latest changes.

![Branch release workflow](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*sprNnKIy2LDtey2tD5k7xA.png)

## Main Release Workflow

Once a feature is ready for prime time, we push to the **main branch**. This triggers the final steps of our release pipeline

✅ Triggered on push to main

✅ Automatically generates the next release number

✅ Automatically generates release notes from commit messages

✅ Publish to npm registry

✅ Slack alert to all stakeholders

✅ Storybook auto-updated with versioned build

![Main branch release workflow](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*AKTKrNExJ96T6tkIvEal5g.png)

## Release Versioning Strategy

To automate this process effectively, it’s crucial to understand two foundational concepts [Semantic Versioning](https://semver.org/) and [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). These standards enable the automation tool to correctly determine the type of version update needed (major, minor, patch) and generate meaningful release notes without manual intervention.

### Semantic Versioning

Semantic Versioning is a versioning scheme that uses a three-part number: **MAJOR.MINOR.PATCH** (e.g., 1.3.5), which communicates the type and impact of changes in the software.

- **MAJOR** version increases when you make incompatible API changes (breaking changes).
- **MINOR** version increases when you add functionality in a backwards-compatible manner.
- **PATCH** version increases when you make backwards-compatible bug fixes.

![Semantic Versioning](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*DySBD4scwrcCLvzKlTYRCQ.png)

This system helps users understand the scope of changes and compatibility by just looking at the version number.

### Conventional Commits

The Conventional Commits specification is a lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history which makes it easier to write automated tools on top of. This convention dovetails with [Semantic Versioning](http://semver.org/), by describing the features, fixes, and breaking changes made in commit messages.

### Commit Message Format

Semantic-release relies on Conventional Commit messages to determine the next version automatically.

`<type>[optional scope]: <description> [optional body] [optional footer(s)]`

![Commit Message Format and results](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*BWPwR17aO5MBluwEUPDVWw.png)

Now that you have a clear understanding of **Semantic Versioning** and **Conventional Commits**, it’s time to dive into how they work together to power **Semantic Release**.

## What is Semantic Release?

**Semantic Release** is an automated versioning and changelog generation tool that streamlines the release process. By analyzing your **commit history** specifically the messages that follow the **Conventional Commits** format it automatically determines the appropriate version bump (major, minor, or patch) based on the changes made. This removes the need for manual version management, reducing human error and improving consistency in your releases.

### **Semantic Release** uses the following process

- It **analyzes each commit** based on the Conventional Commit messages.
- It **determines the version bump** (major, minor, or patch) by interpreting commit types.
- It **auto-generates a changelog** that highlights what’s changed (features, fixes, or breaking changes).
- It **publishes the release**, including version updates, to relevant platforms such as your npm registry or AWS CodeArtifact.

In our Library Semantic Release is configured to automatically create GitHub tags for each release. This means that every time a new version of our software is released, a corresponding tag is generated in our GitHub repository.

![GitHub Tags Generated by Semantic Release](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*h1rAwiERYrTVzKA2k5G7Pw.png)

Semantic Release also generates meaningful release notes automatically, which are linked to the react-redux-ui-lib GitHub repository.

![How to Link Release Notes Using Tags with Semantic Release](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*tQgAMhm374XSMLbuFXD1Ng.png)![Release Notes Generated by Semantic Release](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*uEUFVrwr8DdfK4Yd0yyLlQ.png)

With **Semantic Release**, we have streamlined our release process by automating versioning, changelog generation, and publication. This not only saves us time but also ensures a consistent and reliable flow of releases. Let’s take a look at the key benefits we’ve gained from adopting this approach

### Benifits we got from Semantic Releases

✅ Ensures consistency in releases

✅ Promotes good commit hygiene

✅ Reduces human errors

✅ Saves time and increases confidence

✅ Improves collaboration across teams

✅ Can handle sophisticated release requirements

✅ Purposefully built for library releases

## What We Gained from Streamlining Our UI Library Development

By implementing the strategies discussed in this series, we were able to significantly enhance our development and release processes. Here’s a snapshot of what we’ve achieved.

✅ Reduced release time

✅ Improved reliability and visibility

✅ Real integration testing before merge

✅ Clear versioning and change logs

✅ Pre-release sharing = faster feedback loops

✅ Reduced rework

In this article series, we’ve explored how to **Streamline UI Library Development From Design to Release**. The tools and methodologies we’ve implemented were chosen based on our specific use cases and needs. My goal was to break down these concepts with real-world examples to help you understand how they can fit into your own development process.

Think of the tools and processes we’ve discussed as **building blocks.** you can easily swap out the ones we use for the ones that suit your unique requirements. The key takeaway is that streamlining your workflow doesn’t require a one-size-fits-all approach. it’s about finding what works best for you and your team.

If you have any questions or would like to dive deeper into these strategies, feel free to leave a comment below or reach out to me directly. You can also check out the source code for the [**radix-react-ui-lib**](https://github.com/abhimax/radix-react-ui-lib) project to get a clearer picture of the approach. I’d love to hear about your experiences and assist you with your own UI library development journey!

![captionless image](https://miro.medium.com/v2/resize:fit:720/format:webp/1*rf7JnZZHH0jURF_qD6rv5Q.jpeg)
