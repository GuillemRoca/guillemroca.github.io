---
title: 'Mastering Recompositions in Jetpack Compose'
description: 'A deep dive into how recompositions work in Jetpack Compose and strategies to optimize your Android UI performance.'
pubDate: 2024-05-12
heroImage: '/images/blog-recomposition.png'
tags: ['Android', 'Kotlin', 'Compose', 'Performance']
---

Jetpack Compose has revolutionized Android UI development by introducing a declarative paradigm. However, with great power comes the responsibility of managing recompositions efficiently. In this post, I explore the mechanics of recomposition and how to avoid common pitfalls.

## What is Recomposition?

Recomposition is the process of updating the UI hierarchy when the state of your application changes. In Compose, your UI is defined by functions that transform data into a UI hierarchy. When data changes, Compose re-executes these functions to create an updated UI.

```kotlin
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    Button(onClick = { count++ }) {
        Text("Count: $count")
    }
}
```

## The Pitfall: Excessive Recomposition

If not handled correctly, specific state changes can trigger recompositions of extensive parts of the UI tree that haven't actually changed. This can lead to dropped frames and a sluggish user experience (jank).

### Key Strategies for Optimization

1.  **State Hoisting:** Keep your state as high as necessary but as low as possible.
2.  **`derivedStateOf`:** Use this to prevent unnecessary recompositions when a state changes frequently but the UI only cares about a specific threshold or derived value.
3.  **Stability annotations:** Help the compiler understand which classes are stable and can be skipped during recomposition.

For a practical demonstration, check out my [sample repository](https://github.com/GuillemRoca/compose-recompositions) where I purposefully break and fix recomposition scenarios.
