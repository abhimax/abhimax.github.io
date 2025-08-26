# Streamlining UI Library Development From Design to Release​

## PART 02 — Bridging Design and Development through Token Synchronization

[![Abhiman Ranaweera](https://miro.medium.com/v2/resize:fill:64:64/1*5csW6IzMy7Uq75Y-KjI36w.jpeg)](https://medium.com/@abhimanranaweera?source=post_page---byline--ddf9fe8cc531---------------------------------------)

[Abhiman Ranaweera](https://medium.com/@abhimanranaweera?source=post_page---byline--ddf9fe8cc531---------------------------------------)

5 min read | Aug 20 2025

In [Part 01](https://medium.com/front-end-weekly/streamlining-ui-library-development-from-design-to-release-5fd4f888510a) of this article, we explored the architecture of our UI library and tackled the challenges we faced along the way. Now, in this section, we’ll dive into one of the most critical aspects of UI library development, syncing design tokens between design and development teams.

We’ll discuss the strategies and solutions we implemented to bridge the gap between design and development, ensuring that the design vision stays intact throughout the build process. Let’s dive in, as we share practical insights into tackling one of the most common challenges in design-to-development workflows

# Our Approach to Bridging the Gap with Design Tokens

To solve the syncing issues between the **Design Team** and the **Component Library Development Team**, we introduce **Design Tokens**.

## What are Design Tokens?

Design tokens are a set of variables that store design decisions like colors, typography, spacing, and other visual properties. These tokens act as a bridge between design and development, providing a **consistent reference** that can be used across both teams. Instead of manually translating design styles into code, designers define tokens, and developers can directly use them in the codebase.

![Design tokens usage](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*OyNRNGIAwFLR9-VktNq43g.png)

Design tokens help ensure that design changes are automatically reflected in the development process, reducing miscommunication and maintaining design consistency.

Now that we’ve established how design tokens solve some syncing issues, let’s move on to how **token syncing** can further streamline the workflow between design and development teams.

# Syncing Design Tokens from Figma to GitHub​

Through our research, we identified two primary methods for syncing Figma tokens with GitHub.

1. Figma API + Style Dictionary

---

The [**Figma API**](https://www.figma.com/developers/api) allows us to extract design tokens directly from Figma files. By integrating it with [**Style Dictionary**](https://styledictionary.com/), we automate the process of converting design tokens into a format usable in the development environment. This ensures a seamless, real-time flow of design updates to the development team.

![Figma API + Styled Dictionary](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*hZ50_ArWrvjmLkVurruXQg.png)

- **Pros**: Fully customizable, automated process, integrates well into CI/CD pipelines.
- **Cons**: Requires manual scripting, Figma Enterprise + Dev Seat (High cost), and lacks token grouping or theming support.

## **2. Token Studio Plugin + Style Dictionary**

The [**Token Studio plugin**](https://tokens.studio/) for Figma helps us manage and organize design tokens directly within the Figma interface. Once defined, tokens are synced with **Style Dictionary** for easy export to the development codebase, ensuring consistency and up-to-date alignment between design and development teams.

![Figma Token Studio + Styled Dictionary](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*4viDKXx1tIvCwFlzuqQd7Q.png)

- **Pros**: Visual UI for easy management, native GitHub sync, supports token sets and themes.
- **Cons**: Plugin-dependent, limited customization, requires manual work for syncing.

# Syncing Figma Tokens with the Component Library

The diagram below illustrates how we sync design tokens from Figma and integrate them into our component library. As shown, any changes made to the Figma design tokens are automatically reflected in the component library’s codebase. The synced token JSON is converted into CSS variables using Style Dictionary, which updates the styles across all components.

![Bridging Design and Development by syncing Figma Tokens with the Component Library](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*5JQDxQ-ROs_hU7_0p1Mc4g.png)

# Steps for syncing tokens

To integrate style changes and ensure the proper flow between Figma and the [**_radix-react-ui-lib_**](https://github.com/abhimax/radix-react-ui-lib), developers should follow these steps:

## **1. Generate Personal Access Tokens**

Go to your GitHub account settings and generate a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens). Make sure the token has the necessary permissions to access the repository containing your style files. (This is a one-time process.)

## **2. Install the Token Studio Plugin**

In Figma, install the **Token Studio** plugin, which allows you to sync design tokens between Figma and GitHub.

## **3. Connect Token Studio with GitHub**

Open Token Studio in Figma and input the personal access token you generated from GitHub. Link Token Studio to the relevant GitHub repository where the design tokens are stored.

![Connect Token Studio with GitHub](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*CGNzvFiqFU9cHXmKAS61wQ.png)

## **4. Sync Design Tokens**

Use Token Studio to sync the design tokens between Figma and GitHub. Any changes made in Figma (e.g., color, typography) will be automatically updated in the GitHub repository.

## **5. Pull Latest Changes**

Developers should regularly pull the latest style updates from the repository to keep the local environment aligned with Figma’s design tokens.

## **6. Apply the Updates**

Once the styles are synced, developers should update the components in the [**_radix-react-ui-lib_**](https://github.com/abhimax/radix-react-ui-lib) component library with the latest design tokens.

# Who Should Perform This Task?

This process typically involves collaboration between both the design and development teams. However, the exact role that will execute these steps depends on your team’s workflow.

## Design Team Responsibilities

1.  **Manage Figma Tokens**: Create and update design tokens in Figma.
2.  **Install Token Studio**: Set up the Token Studio plugin in Figma.
3.  **Communicate Updates**: Inform the development team of token changes.
4.  **Review** the token changes on the pull request

## Development Team Responsibilities

1.  **GitHub Integration**: Set up GitHub connection and token file path.
2.  **Sync Tokens**: Use Token Studio to sync Figma tokens to GitHub.
3.  **Branch Management**: Work in a separate branch to avoid conflicts during sync.
4.  **Review** the token changes on the pull request

Obtaining a service account for GitHub would be ideal, as it allows us to share access based on specific responsibilities.

Anyway we need a **specific role with access to both Figma and GitHub** should be created to handle the synchronization process, ensuring smooth collaboration between the design and development teams.

# What’s Coming Next in the Series?

![captionless image](https://miro.medium.com/v2/resize:fit:1152/format:webp/1*hzWIW2JD4R_onjbphs4-uA.jpeg)

This article delved into the challenges of syncing between the design team and the component library development team. We highlighted two primary methods for syncing Figma tokens with GitHub and discussed how bridging design and development through token synchronization can streamline the process. We hope this provides a valuable solution to the ongoing concerns in design-to-development workflows. You can explore our source code to get a better understanding of the [**_radix-react-ui-lib_**](https://github.com/abhimax/radix-react-ui-lib) architecture. Also methods and tools we’ve discussed are flexible. think of them as building blocks that you can customize with your own preferred tools.

Next part of our article series will focus on the challenges between the Component Library Development Team and the Consumer (Product) Teams, and how we overcame those obstacles. I’m sure many of you have encountered similar challenges, just like Us. The next part will be even more interesting, so stay tuned, and happy coding!
