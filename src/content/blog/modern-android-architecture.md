---
title: 'Architecting Modern Android Apps'
description: 'Implementing Clean Architecture, MVVM, and Modularization in a real-world GitHub browser application.'
pubDate: 2025-01-15
heroImage: '/images/blog-arch.png'
tags: ['Architecture', 'Clean Code', 'Modularization', 'Android']
---

Scalability and maintainability are the primary goals of any serious software project. In the Android ecosystem, "Clean Architecture" combined with MVVM (Model-View-ViewModel) has become the gold standard.

I built [github-browser-lab](https://github.com/GuillemRoca/github-browser-lab) to serve as a reference implementation for these patterns.

## The Layers

1.  **Domain Layer:** The pure Kotlin core. It contains Entities and Use Cases. It knows nothing about Android or the database.
2.  **Data Layer:** The implementation details. Repositories, Retrofit services, and Room databases live here. It maps raw data to Domain entities.
3.  **Presentation Layer:** The UI. Activities, Fragments (or Composables), and ViewModels. It observes the domain data and renders it.

## Dependency Injection

To glue everything together without tight coupling, I rely heavily on **Hilt**.

```kotlin
@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {
    @Provides
    fun provideGithubService(): GithubService { ... }
}
```

This separation of concerns allows me to swap out the database implementation or network client without touching the UI code, and makes unit testing the business logic effortless.
