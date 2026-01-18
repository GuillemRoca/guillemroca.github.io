---
title: 'Building for Every Platform with Kotlin Multiplatform'
description: 'How I built a cross-platform bird watching app using Kotlin Multiplatform and Compose Multiplatform.'
pubDate: 2024-11-28
heroImage: '/images/blog-kmp.png'
tags: ['KMP', 'Kotlin', 'iOS', 'Android']
---

The dream of "write once, run anywhere" has been around for decades. With Kotlin Multiplatform (KMP), we are getting closer than ever, but with a pragmatic twist: "Share logic, keep native UI control" (though Compose Multiplatform is changing that too!).

In my project [birds](https://github.com/GuillemRoca/birds), I explored sharing not just the business logic but also the UI across Android and iOS using Compose Multiplatform.

## The Shared Core

The core of the application resides in the `shared` module. This includes:

*   **Networking:** Using Ktor for making API requests.
*   **Serialization:** Using `kotlinx.serialization` for parsing JSON.
*   **State Management:** ViewModels (or equivalent) that drive the UI state.

## Compose Multiplatform

The real magic happens in the UI layer. With Compose Multiplatform, I could write the UI once in Kotlin and have it render natively on Android and via Skia on iOS.

```kotlin
@Composable
fun BirdList(birds: List<Bird>) {
    LazyColumn {
        items(birds) { bird ->
            BirdCard(bird)
        }
    }
}
```

The result is a fluid, high-performance application that feels at home on both platforms while sharing 90%+ of the codebase.
