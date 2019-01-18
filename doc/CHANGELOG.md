<a name="1.0.5"></a>
## [1.0.5](https://github.com/aurelia/metadata/compare/1.0.4...1.0.5) (2019-01-18)

* Add module field to package.json.

<a name="1.0.4"></a>
## [1.0.4](https://github.com/aurelia/metadata/compare/1.0.3...1.0.4) (2018-06-13)


### Bug Fixes

* **metadata:** IE cross origin frame Access Denied on Window['frameElement'] in Origin.get ([5e678d7](https://github.com/aurelia/metadata/commit/5e678d7))
* **metadata:** IE cross origin frame Access Denied on Window['frameElement'] in Origin.get - add test ([553c5a2](https://github.com/aurelia/metadata/commit/553c5a2))



<a name="1.0.3"></a>
## [1.0.3](https://github.com/aurelia/metadata/compare/1.0.2...v1.0.3) (2016-12-23)


### Bug Fixes

* **metadata:** handle primitive targets ([ecf28dd](https://github.com/aurelia/metadata/commit/ecf28dd)), closes [aurelia/templating-resources#267](https://github.com/aurelia/templating-resources/issues/267) [aurelia/metadata#47](https://github.com/aurelia/metadata/issues/47) [aurelia/binding#551](https://github.com/aurelia/binding/issues/551) [aurelia/dependency-injection#141](https://github.com/aurelia/dependency-injection/issues/141) [aurelia/binding#376](https://github.com/aurelia/binding/issues/376)



<a name="1.0.1"></a>
## [1.0.1](https://github.com/aurelia/metadata/compare/1.0.0...v1.0.1) (2016-10-05)


### Bug Fixes

* issue [#41](https://github.com/aurelia/metadata/issues/41) ([7b4a0bc](https://github.com/aurelia/metadata/commit/7b4a0bc))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/aurelia/metadata/compare/1.0.0-rc.1.0.1...v1.0.0) (2016-07-27)



<a name="1.0.0-rc.1.0.1"></a>
# [1.0.0-rc.1.0.1](https://github.com/aurelia/metadata/compare/1.0.0-rc.1.0.0...v1.0.0-rc.1.0.1) (2016-07-12)



<a name="1.0.0-rc.1.0.0"></a>
# [1.0.0-rc.1.0.0](https://github.com/aurelia/metadata/compare/1.0.0-beta.2.0.1...v1.0.0-rc.1.0.0) (2016-06-22)



### 1.0.0-beta.1.2.1 (2016-05-10)


#### Bug Fixes

* **metadata:** targetKey in Reflect.defineMetadata is optional ([fa861f7c](https://github.com/aurelia/metadata/commit/fa861f7c8fd867331b607021ec3b0e871262990f))


### 1.0.0-beta.1.2.0 (2016-03-22)

* Update to Babel 6

### 1.0.0-beta.1.1.6 (2016-03-02)


#### Bug Fixes

* **for-of:** remove for of loop ([cd1fca10](https://github.com/aurelia/metadata/commit/cd1fca10af480a0228d4e6a8dba8cf3d9b2c0754))


### 1.0.0-beta.1.1.5 (2016-03-01)


#### Bug Fixes

* **all:** remove core-js dependency ([3a300a87](https://github.com/aurelia/metadata/commit/3a300a87126ccf1ab2656c3a09a983a72316d9c9))


#### Features

* **all:** remove duplicate code and use new polyfills ([ec2b65ee](https://github.com/aurelia/metadata/commit/ec2b65ee17db5e24b050fca3ea1e088f8ca7aff7))


### 1.0.0-beta.1.1.4 (2016-02-08)


### 1.0.0-beta.1.1.2 (2016-01-28)

* fix package metadata for jspm

### 1.0.0-beta.1.1.0 (2016-01-28)


#### Features

* **all:** update for jspm; update core-js; update aurelia deps ([01aa7e40](https://github.com/aurelia/metadata/commit/01aa7e404834a5d1824501108fc17bce98536a8c))


### 1.0.0-beta.1 (2015-11-15)


### 0.10.1 (2015-11-11)


#### Bug Fixes

* **all:** improve TS happiness for decorators ([dd35c4fd](https://github.com/aurelia/metadata/commit/dd35c4fd1ef089764bdbacde8380aa4d47e28d2c))


## 0.10.0 (2015-11-09)


#### Bug Fixes

* **decorators:** remove generics causing the build to fail ([88067ab4](https://github.com/aurelia/metadata/commit/88067ab4d52b9d8d8b8888a78cd92edd5e0f197c))
* **eslintrc:** linting configuration ([86ee6498](https://github.com/aurelia/metadata/commit/86ee6498b26565dac53114d64ab42cab1cbbf44a))
* **protocol:** make decorates work with any object type ([dd64b951](https://github.com/aurelia/metadata/commit/dd64b951f3589573a418ab138046be08ebdc5220))


#### Features

* **all:** new decorators, mixin, protocol and deprecated; new way for ES5/6 to apply decor ([b0c2cd4c](https://github.com/aurelia/metadata/commit/b0c2cd4c018dd5deed22e396cd50b468e633751d))


## 0.9.0 (2015-10-13)


#### Bug Fixes

* **ResourceType:** fix load to return Promise ([a43e8d28](https://github.com/aurelia/metadata/commit/a43e8d28b7c85bcff20119de2b0c384a9853a50e))
* **all:**
  * Metadata to metadata Decorators to decorators ([86abaa7b](https://github.com/aurelia/metadata/commit/86abaa7b1c2bcf98681c7ce2eda1686eadd235ae))
  * remove System faking and move eachModule helper ([b8c1ce2e](https://github.com/aurelia/metadata/commit/b8c1ce2e3db6c4e54cbe914fe037479c612928db))
  * address issue with globals and remove unnecessary Reflect.metadata poly ([93cda3b4](https://github.com/aurelia/metadata/commit/93cda3b401e706b837fc398c1fc106e829e936fe))
  * update compiler, fix core-js ref ([b3dd9ea8](https://github.com/aurelia/metadata/commit/b3dd9ea8619f90efbaf9ff2d6617b7d92ad348bb))
* **annotations:**
  * remove bad export ([e307aaa8](https://github.com/aurelia/metadata/commit/e307aaa80260b4c674dd6fb577d92be37c297916))
  * normalize annotations on the fly ([0c2b6a55](https://github.com/aurelia/metadata/commit/0c2b6a55feb08a6f56605dad245a83ce16172035))
* **annotations spec:** remove bad import ([d949c42d](https://github.com/aurelia/metadata/commit/d949c42d8129829c5168fcf4b861d9e6231af11f))
* **build:**
  * update linting, testing and tools ([15c83ea6](https://github.com/aurelia/metadata/commit/15c83ea6414849e0102a5986358d43e9918578a0))
  * add missing bower bump ([017aad74](https://github.com/aurelia/metadata/commit/017aad746538ae3f65955e370b57f260946ed01b))
* **metadata:**
  * Use correct import for core-js We were previously using `import core from core-j ([d7895cf5](https://github.com/aurelia/metadata/commit/d7895cf54debecce7f281eae33024d74f254815e))
  * incorrect types and global references ([88dbfb5e](https://github.com/aurelia/metadata/commit/88dbfb5e5925af9b95f8731f3700bd2e3ec034e6), closes [#16](https://github.com/aurelia/metadata/issues/16), [#17](https://github.com/aurelia/metadata/issues/17))
  * mark fake System as such ([c40cfcb8](https://github.com/aurelia/metadata/commit/c40cfcb87c3c788f607d3ff67bf494ca05f5be15))
  * store in private map ([52aed24e](https://github.com/aurelia/metadata/commit/52aed24ec5f7f25477cb8021493232c49d67be8b))
  * fix initializer for _first property ([740eb07c](https://github.com/aurelia/metadata/commit/740eb07c39b883b1d4e08e5dc779ee9e960a4e07))
  * add the locator config back on a configure property ([555612d1](https://github.com/aurelia/metadata/commit/555612d1df56e18c75b2c27bb9c99e0449fefa7e))
  * fix safari complaint about variable "locator" ([6e887eac](https://github.com/aurelia/metadata/commit/6e887eac6eb4a7cd74b3b87080c6169d180cfa8e))
  * rename configuration helper ([81c73ec1](https://github.com/aurelia/metadata/commit/81c73ec13ceeb6f257d6ae7a6ca91a02ed43ddcf))
  * accidental double wrapping of custom location function ([ac11ead8](https://github.com/aurelia/metadata/commit/ac11ead8cdb031c51bf705ea7775108b6f29ddcb))
* **origin:**
  * short-circuit module registry search on origin location success ([889e0ce7](https://github.com/aurelia/metadata/commit/889e0ce753d40b320ca803a5e4b16e4716219707))
  * never return null for a origin check ([cc25a5e6](https://github.com/aurelia/metadata/commit/cc25a5e6f8e0336cd5817a3460f1921d83969af8))
* **origin.spec:** incorrect test for empty origin data ([14304d56](https://github.com/aurelia/metadata/commit/14304d562eb78c93264052bd1fe21eb74dd69842))
* **package:**
  * update aurelia tools and dts generator ([4cba6176](https://github.com/aurelia/metadata/commit/4cba61761b80ad9241a2516c72bee5999abe8986))
  * change jspm directories ([2d61d2da](https://github.com/aurelia/metadata/commit/2d61d2dae9b8ce6899afffccd8f93ee0b5de8010))
* **readme:** Now mentions Chrome required to run tests. ([86d9f4c2](https://github.com/aurelia/metadata/commit/86d9f4c29c9a859bb22d981d30707c85761d5a38))
* **test:** correct import sources ([fd5b6f06](https://github.com/aurelia/metadata/commit/fd5b6f0696aa8e735fcf59f633e7b7f75924932f))


#### Features

* **all:**
  * update to pal ([6544cec1](https://github.com/aurelia/metadata/commit/6544cec1d8b5d2576ceb53e1d7b5c54718178c88))
  * improve d.ts generation and api doc comments ([901f6747](https://github.com/aurelia/metadata/commit/901f6747e6513a6a03b6d9861b63c843d4487f6e))
  * improve type info ([1818b0a8](https://github.com/aurelia/metadata/commit/1818b0a8631c32870dc93a7fff53a31e9871cdc7))
  * metadata is now based on the ES7 proposal ([32ebe967](https://github.com/aurelia/metadata/commit/32ebe9676b89156cda736ecdf106b92002275ffd))
  * new decorator infrastructure ([72a6226e](https://github.com/aurelia/metadata/commit/72a6226e202c28f538f1f6350a130d0d76e23fa9))
* **annotations:** enable deep traversal of inheritance hierarchy ([db07e892](https://github.com/aurelia/metadata/commit/db07e8920ea880ca16f3edc18afc0c99d79360fa))
* **build:**
  * d.ts generation and build concat ([e7e24b5b](https://github.com/aurelia/metadata/commit/e7e24b5b0502920c6616219d305134c1e69b4fea))
  * update to latest 6to5 and switch to system.register module format ([8d5e644b](https://github.com/aurelia/metadata/commit/8d5e644be29f42f27a0bb2d1e7b0ca63893d1735))
* **docs:** generate api.json from .d.ts file ([8edc2390](https://github.com/aurelia/metadata/commit/8edc2390d55fec7b9538d86d900a921e907b209b))
* **metadata:**
  * add a noop property for noop functions ([bcd4fc66](https://github.com/aurelia/metadata/commit/bcd4fc66f49011d55c6635e7025139e139c8867a))
  * add firstOrAdd helper ([8ba74b71](https://github.com/aurelia/metadata/commit/8ba74b710f78ddd3f6aa6b059ca54273e91ce960))
  * enable adding custom metadata as first metadata method ([705fd865](https://github.com/aurelia/metadata/commit/705fd8650f8d5e20933582cf4d694062cc2e15de), closes [#7](https://github.com/aurelia/metadata/issues/7))
  * enhance dsl for configuring added metadata ([8ba28995](https://github.com/aurelia/metadata/commit/8ba2899578cf1353e16f6e695ce93a538153d6bf))
  * add a "has" helper to MetadataStorage ([362fcc7b](https://github.com/aurelia/metadata/commit/362fcc7bfe4793cc2b2c296b33d21a5a6a9e99f8))
  * new metadata fluent api ([b4c8162f](https://github.com/aurelia/metadata/commit/b4c8162f3428b7aa09db4bd8dd01f6a5505bf7ef))
  * re-implement metadata ([ce0304e2](https://github.com/aurelia/metadata/commit/ce0304e2fdc1f2aa69c3146aa9c42a260d868c0e))
* **origin:**
  * search module registry for module id if not found ([4abfc246](https://github.com/aurelia/metadata/commit/4abfc2469da4db3d3a077cb733c75e0c364f7068))
  *  do not alter target object or function with origin data ([cbb8ac3a](https://github.com/aurelia/metadata/commit/cbb8ac3aeb15873232d76a97d1ba97dd8aa63d91))


## 0.8.0 (2015-09-04)


#### Bug Fixes

* **build:** update linting, testing and tools ([15c83ea6](https://github.com/aurelia/metadata/commit/15c83ea6414849e0102a5986358d43e9918578a0))


#### Features

* **all:** improve d.ts generation and api doc comments ([901f6747](https://github.com/aurelia/metadata/commit/901f6747e6513a6a03b6d9861b63c843d4487f6e))
* **metadata:** add a noop property for noop functions ([bcd4fc66](https://github.com/aurelia/metadata/commit/bcd4fc66f49011d55c6635e7025139e139c8867a))


### 0.7.3 (2015-08-14)


#### Bug Fixes

* **metadata:** Use correct import for core-js We were previously using `import core from core-j ([d7895cf5](https://github.com/aurelia/metadata/commit/d7895cf54debecce7f281eae33024d74f254815e))


#### Features

* **all:** improve type info ([1818b0a8](https://github.com/aurelia/metadata/commit/1818b0a8631c32870dc93a7fff53a31e9871cdc7))
* **docs:** generate api.json from .d.ts file ([8edc2390](https://github.com/aurelia/metadata/commit/8edc2390d55fec7b9538d86d900a921e907b209b))


### 0.7.2 (2015-08-04)


### 0.7.1 (2015-07-29)


#### Bug Fixes

* **metadata:** incorrect types and global references ([88dbfb5e](https://github.com/aurelia/metadata/commit/88dbfb5e5925af9b95f8731f3700bd2e3ec034e6), closes [#16](https://github.com/aurelia/metadata/issues/16), [#17](https://github.com/aurelia/metadata/issues/17))


## 0.7.0 (2015-07-01)


#### Bug Fixes

* **all:** address issue with globals and remove unnecessary Reflect.metadata poly ([93cda3b4](https://github.com/aurelia/metadata/commit/93cda3b401e706b837fc398c1fc106e829e936fe))
* **metadata:** mark fake System as such ([c40cfcb8](https://github.com/aurelia/metadata/commit/c40cfcb87c3c788f607d3ff67bf494ca05f5be15))
* **origin:** short-circuit module registry search on origin location success ([889e0ce7](https://github.com/aurelia/metadata/commit/889e0ce753d40b320ca803a5e4b16e4716219707))
* **package:** update aurelia tools and dts generator ([4cba6176](https://github.com/aurelia/metadata/commit/4cba61761b80ad9241a2516c72bee5999abe8986))
* **test:** correct import sources ([fd5b6f06](https://github.com/aurelia/metadata/commit/fd5b6f0696aa8e735fcf59f633e7b7f75924932f))


#### Features

* **build:** d.ts generation and build concat ([e7e24b5b](https://github.com/aurelia/metadata/commit/e7e24b5b0502920c6616219d305134c1e69b4fea))


## 0.6.0 (2015-06-08)


#### Bug Fixes

* **readme:** Now mentions Chrome required to run tests. ([86d9f4c2](https://github.com/aurelia/metadata/commit/86d9f4c29c9a859bb22d981d30707c85761d5a38))


#### Features

* **origin:** search module registry for module id if not found ([4abfc246](https://github.com/aurelia/metadata/commit/4abfc2469da4db3d3a077cb733c75e0c364f7068))


## 0.5.0 (2015-04-30)


#### Bug Fixes

* **origin:** never return null for a origin check ([cc25a5e6](https://github.com/aurelia/metadata/commit/cc25a5e6f8e0336cd5817a3460f1921d83969af8))
* **origin.spec:** incorrect test for empty origin data ([14304d56](https://github.com/aurelia/metadata/commit/14304d562eb78c93264052bd1fe21eb74dd69842))


#### Features

* **all:** metadata is now based on the ES7 proposal ([32ebe967](https://github.com/aurelia/metadata/commit/32ebe9676b89156cda736ecdf106b92002275ffd))


## 0.4.0 (2015-04-09)


#### Bug Fixes

* **ResourceType:** fix load to return Promise ([a43e8d28](https://github.com/aurelia/metadata/commit/a43e8d28b7c85bcff20119de2b0c384a9853a50e))
* **all:** update compiler, fix core-js ref ([b3dd9ea8](https://github.com/aurelia/metadata/commit/b3dd9ea8619f90efbaf9ff2d6617b7d92ad348bb))
* **metadata:**
  * store in private map ([52aed24e](https://github.com/aurelia/metadata/commit/52aed24ec5f7f25477cb8021493232c49d67be8b))
  * fix initializer for _first property ([740eb07c](https://github.com/aurelia/metadata/commit/740eb07c39b883b1d4e08e5dc779ee9e960a4e07))
  * add the locator config back on a configure property ([555612d1](https://github.com/aurelia/metadata/commit/555612d1df56e18c75b2c27bb9c99e0449fefa7e))


#### Features

* **all:** new decorator infrastructure ([72a6226e](https://github.com/aurelia/metadata/commit/72a6226e202c28f538f1f6350a130d0d76e23fa9))
* **metadata:** add firstOrAdd helper ([8ba74b71](https://github.com/aurelia/metadata/commit/8ba74b710f78ddd3f6aa6b059ca54273e91ce960))


### 0.3.4 (2015-03-24)


#### Features

* **metadata:** enable adding custom metadata as first metadata method ([705fd865](https://github.com/aurelia/metadata/commit/705fd8650f8d5e20933582cf4d694062cc2e15de), closes [#7](https://github.com/aurelia/metadata/issues/7))


### 0.3.3 (2015-02-28)


#### Bug Fixes

* **package:** change jspm directories ([2d61d2da](https://github.com/aurelia/metadata/commit/2d61d2dae9b8ce6899afffccd8f93ee0b5de8010))


### 0.3.2 (2015-02-27)


#### Bug Fixes

* **build:** add missing bower bump ([017aad74](https://github.com/aurelia/metadata/commit/017aad746538ae3f65955e370b57f260946ed01b))


### 0.3.1 (2015-01-25)


#### Bug Fixes

* **metadata:** fix safari complaint about variable "locator" ([6e887eac](https://github.com/aurelia/metadata/commit/6e887eac6eb4a7cd74b3b87080c6169d180cfa8e))


## 0.3.0 (2015-01-22)


#### Bug Fixes

* **metadata:**
  * rename configuration helper ([81c73ec1](https://github.com/aurelia/metadata/commit/81c73ec13ceeb6f257d6ae7a6ca91a02ed43ddcf))
  * accidental double wrapping of custom location function ([ac11ead8](https://github.com/aurelia/metadata/commit/ac11ead8cdb031c51bf705ea7775108b6f29ddcb))


#### Features

* **metadata:**
  * enhance dsl for configuring added metadata ([8ba28995](https://github.com/aurelia/metadata/commit/8ba2899578cf1353e16f6e695ce93a538153d6bf))
  * add a "has" helper to MetadataStorage ([362fcc7b](https://github.com/aurelia/metadata/commit/362fcc7bfe4793cc2b2c296b33d21a5a6a9e99f8))
  * new metadata fluent api ([b4c8162f](https://github.com/aurelia/metadata/commit/b4c8162f3428b7aa09db4bd8dd01f6a5505bf7ef))
  * re-implement metadata ([ce0304e2](https://github.com/aurelia/metadata/commit/ce0304e2fdc1f2aa69c3146aa9c42a260d868c0e))
* **origin:**  do not alter target object or function with origin data ([cbb8ac3a](https://github.com/aurelia/metadata/commit/cbb8ac3aeb15873232d76a97d1ba97dd8aa63d91))


### 0.2.4 (2015-01-12)


#### Bug Fixes

* **annotations:** remove bad export ([e307aaa8](https://github.com/aurelia/metadata/commit/e307aaa80260b4c674dd6fb577d92be37c297916))
* **annotations spec:** remove bad import ([d949c42d](https://github.com/aurelia/metadata/commit/d949c42d8129829c5168fcf4b861d9e6231af11f))


### 0.2.3 (2015-01-06)

* Updated package data to ensure proper system.register module format detetion by jspm.

## 0.2.0 (2015-01-06)


#### Features

* **annotations:** enable deep traversal of inheritance hierarchy ([db07e892](https://github.com/aurelia/metadata/commit/db07e8920ea880ca16f3edc18afc0c99d79360fa))
* **build:** update to latest 6to5 and switch to system.register module format ([8d5e644b](https://github.com/aurelia/metadata/commit/8d5e644be29f42f27a0bb2d1e7b0ca63893d1735))


## 0.1.0 (2014-12-11)


#### Bug Fixes

* **annotations:** normalize annotations on the fly ([0c2b6a55](https://github.com/aurelia/metadata/commit/0c2b6a55feb08a6f56605dad245a83ce16172035))
