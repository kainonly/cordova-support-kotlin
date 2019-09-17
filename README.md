
# cordova-support-kotlin

[![npm](https://img.shields.io/npm/v/cordova-support-kotlin.svg)](https://www.npmjs.com/package/cordova-support-kotlin) [![npm](https://img.shields.io/npm/dm/cordova-support-kotlin.svg)](https://www.npmjs.com/package/cordova-support-kotlin)

![kotlin-128x128](https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268/sign=818bbcabfcf2b211e42e8248f2826511/9a504fc2d5628535746e08f997ef76c6a6ef6358.jpg)

This [Cordova plugin](https://www.npmjs.com/package/cordova-support-kotlin) help you support kotlin to your android project, At the same time you can use other Cordova plugins that rely on kotlin.

## Installation

Add this plugin in your project:

```shell
cordova plugin add cordova-support-kotlin --save
```

## Settings

Kotlin uses the latest version of `latest.integration` by default. You can set the version you need and configure it like this in your app's `config.xml` file:

```xml
<platform name="android" kotlin="1.2.50">
    ...
</platform>
```

Set additional `apply plugin` elements in the app's `build.gradle`.

Note that the order matters.

```xml
<platform name="android">
    ...
    <apply-plugin>kotlin-android-extensions</apply-plugin>
    <apply-plugin>kotlin-kapt</apply-plugin>
    ...
</platform>
```

You can also add dependencies if you need to.

```xml
<platform name="android">
    ...
    <apply-dependency>org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.0-M2</apply-dependency>
    ...
</platform>
```
