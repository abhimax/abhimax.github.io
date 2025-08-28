# Essential Considerations for Shared State in Micro Frontends

[![Abhiman Ranaweera](https://miro.medium.com/v2/resize:fill:64:64/1*5csW6IzMy7Uq75Y-KjI36w.jpeg)](https://medium.com/@abhimanranaweera?source=post_page---byline--8848b768877a---------------------------------------)

[Abhiman Ranaweera](https://medium.com/@abhimanranaweera?source=post_page---byline--8848b768877a---------------------------------------)

4 min read | Aug 20 2025

![captionless image](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*bsd6Y1Fcn-uDvOxaTr7dPQ.png)

When building micro frontends for a multi-tenant application, managing shared state becomes a critical factor for ensuring data consistency, real-time synchronization, and proper tenant isolation. Without a clear strategy for how shared state should be handled, you risk introducing complexity and inefficiency into your application.

In this post, I’ll explore key recommendations for what to include and what to exclude from the shared state in a micro frontend architecture, ensuring you achieve seamless integration and performance across the entire app.

# What to Include in Shared State

## 🔹 **Tenant Information**

**_What to Include:_** Tenant-specific details such as **tenantId**, **tenantName**, and **tenantConfig**.

**_Why It Matters:_** Each micro frontend needs to know which tenant is using the system, as this drives decisions about what data and configurations should be applied. Having this information in the shared state ensures consistency across all micro frontends.

## 🔹 User Authentication & Role Data

**_What to Include:_** User authentication status (**isLoggedIn**), **userRole**, and **userPermissions**.

**_Why It Matters:_** Keeping track of user authentication globally is crucial for enforcing secure access control. A shared authentication state means that each micro frontend can verify user access without redundancy, creating a smoother user experience.

## 🔹 **Tenant-Specific Configurations**

**_What to Include:_** Configurations like **business working hours**, **notification preferences**, and **branding options**.

**Why It Matters:** These settings must be consistent across all micro frontends to ensure a unified experience for the tenant. Including them in the shared state ensures no mismatches in user interface elements or functionality based on tenant-specific configurations.

## 🔹 Hierarchical Service Information

**_What to Include:_** The user’s **department**, **role**, and **position** in the organization.

**_Why It Matters:_** This data supports **role-based access control** and **navigation**, so it’s essential that each micro frontend can access this information for tailoring the user experience and enforcing permissions.

## 🔹 **User Preferences**

**_What to Include:_** Preferences like **language settings**, **theme** (dark mode or light mode).

**_Why It Matters:_** User preferences should be consistent across the entire application to prevent a fragmented experience. Storing these preferences in the shared state makes sure that regardless of which micro frontend is in use, the user sees their settings applied.

# What to Exclude from Shared State

While shared state is essential for certain types of data, not everything belongs there. Here are the types of data you should **exclude.**

## 🔶 **Sensitive Records**

**_Why Not:_** Sensitive personal and business information should never be part of the shared state due to privacy and security concerns.

**_How to Handle It:_** This data should be securely fetched on demand by the relevant micro frontend and kept locally to minimize exposure.

## 🔶 **Session-Specific Data**

**Why Not:** Temporary form inputs or UI states that are specific to a user’s current session should not be in the shared state. These are transient data that do not need to be universally accessible.

**_How to Handle It:_** Keep this data local to the micro frontend where it is relevant.

## 🔶 **Large Data Sets**

**_Why Not:_** Storing large datasets, like complete business records, in shared state can overwhelm your architecture and cause performance issues.

**How to Handle It:** Only store references to the data (e.g., customertId) in the shared state, and fetch the full dataset as needed.

## 🔶 **Unique Micro Frontend Data**

**_Why Not:_** Data that’s unique to a specific micro frontend, such as temporary UI states or actions that don’t affect other parts of the application, should be kept isolated.

**_How to Handle It:_** Each micro frontend should manage its own local state for these concerns, allowing it to function autonomously without introducing unnecessary complexity.

# Best Practices

## ❇️ Minimal Shared State

Only include essential, shared data like **tenant information** and **user authentication** in the global shared state.

## ❇️ Tenant Isolation

Ensure tenant-specific data is **isolated** to prevent data leakage between tenants.

## ❇️ Efficient State Management

Use local state for non-shared data like UI states or session data.

## ❇️ Security

Use local state for non-shared data like UI states or session data.

## ❇️ Performance

Avoid storing large datasets in shared state. Use **lazy loading** or **API calls** to fetch detailed data when necessary.

# Final Recommendations

In a multi-tenant application, shared state plays a crucial role in ensuring consistency and real-time updates across all micro frontends. By following these guidelines, you can ensure smooth communication between micro frontends while maintaining optimal performance, security, and tenant isolation.

By carefully considering what to include and exclude from the shared state and applying best practices for state management, you’ll set yourself up for a successful micro frontend architecture that’s both scalable and efficient.
