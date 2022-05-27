[TOC]

# language

## Chinese

### 介绍

#### async-clipboard-utils 是什么

async-clipboard-utils 是一个 clipboard 剪贴板操作的简单工具类

async-clipboard-utils 是使用纯 JavaScript 实现的，这意味着它是无依赖的

async-clipboard-utils 的实现仅有少量代码，这意味着它也是轻量级的

**async-clipboard-utils 不支持 IE 浏览器，因为 IE 并不支持 clipboard API**

#### 安装

##### NPM

async-clipboard-utils 托管在 NPM 上，执行以下命令安装

```js
npm i async-clipboard-utils
```

接下来就可以在代码里面引入了

```js
import { asyncClipboardUtils } from "async-clipboard-utils";
```

#### 起步

async-clipboard-utils 最常见的应用场景是你想要向用户的剪贴板进行操作

#### 初始化代码

```js
import { asyncClipboardUtils } from "async-clipboard-utils";

asyncClipboardUtils({
  type: "write-text",
  text: "测试写入",
  clipboardItem: null,
  writeSuccess: function () {},
  writeError: function (error) {},
  readSuccess: function (text) {},
  readError: function (error) {},
  error: function () {},
});
```

此时就初始化了一次向用户剪贴板写入文本的代码

#### 基本配置

async-clipboard-utils 一共有 4 个操作

1. write-text：写入文本
2. write-all：写入文本和二进制数据（图片等）
3. read-text：读取用户文本
4. read-all：读取文本或者二进制数据（图片等）

   > Chrome 浏览器只支持读取和写入.png 格式的图片

async-clipboard-utils 一共有 9 个状态码来判断不同的行为和状态

> 用户如果拒绝 clipboard API 发出的操作剪贴板请求，则会进入失败状态

- 1：‘write-text’ 成功执行之后的回调参数
- 2：‘write-all’ 成功执行之后的回调参数
- 3：‘read-text’ 成功执行之后的回调参数
- 4：‘read-all’ 成功执行之后的回调参数
- -1：‘write-text’ 执行失败之后的回调参数
- -2：‘write-all’ 执行失败之后的回调参数
- -3：‘read-text’ 执行失败之后的回调参数
- -4：‘read-all’ 执行失败之后的回调参数
- -99：如果用户的浏览器版本不支持 clipboard API

async-clipboard-utils 有且只有一个对象格式的参数

##### 参数

- type：值为字符串，值的范围为 4 个操作中的任何一个值
- text：值为字符串，当 type 为‘write-text’时生效，会被写入到剪贴板
- clipboardItem：值为 ClipboardItem 对象实例，ClipboardItem 需要实例化，参数为一个对象

```js
new ClipboardItem({
  "text/plain": "我要被写入了",
});
```

对象的 Key 为数据的 MIME 类型字符串，Value 为值（可以为二进制值）

只有当 type 为‘write-all’时，该字段才会生效

以下给出常用的 MIME 类型字符串

```text
普通文本 .txt text/plain

PNG图像 .png image/png

GIF图形 .gif image/gif

JPEG图形 .jpeg,.jpg image/jpeg

xml文档 .xml text/xml

XHTML文档 .xhtml application/xhtml+xml
```

- writeSuccess：写入成功之后的回调，‘write-text’ 和 ‘write-all’ 均会触发此函数，此函数触发时有一个数值类型的参数，不同行为触发的此函数，会有不同结果的数值参数，‘write-text’ 的参数为 ‘1’，‘write-all’ 的参数为 2

- writeError：写入失败之后的回调，‘write-text’ 和 ‘write-all’ 均会触发此函数，此函数触发时有一个数值类型的参数，不同行为触发的此函数，会有不同结果的数值参数，‘write-text’ 的参数为 ‘-1’，‘write-all’ 的参数为 ‘-2’

- readSuccess：读取用户剪贴板之后的回调，readSuccess 一共有 2 个参数，第一个参数为数组类型，值为从剪贴板读取到值，如果剪贴板为空，则值为空数组。‘read-text’ 和 ‘read-all’ 均会触发此函数，此函数触发时有一个数值类型的参数，不同行为触发的此函数，会有不同结果的数值参数，‘read-text’ 的参数为 ‘3’，‘read-all’ 的参数为 ‘4’，

- readError：读取用户剪贴板失败的回调，‘read-text’ 和 ‘read-all’ 均会触发此函数，此函数触发时有一个数值类型的参数，不同行为触发的此函数，会有不同结果的数值参数，‘read-text’ 的参数为 ‘-3’，
  ‘read-all’ 的参数为 ‘-4’

- error：用户浏览器不支持此 API 时的回调，当用户浏览器不支持时，其余操作均不会执行

> 所有 Error 失败的回调，一共会接收 2 个参数，第一个参数均为 Error 对象，第二个参数为数组类型的参数
> 唯独 error 回调不会返回 Error 对象

#### 常用代码操作

##### 写入图像

> Chrome 浏览器只支持读取和写入.png 格式的图片

```js
const imgURL =
  "https://img2.baidu.com/it/u=124320768,1699059114&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500";
const data = await fetch(imgURL);
const blob = await data.blob();
asyncClipboardUtils({
  type: "write-text",
  text: "",
  clipboardItem: new ClipboardItem({
    [blob.type]: blob,
  }),
});
```

#### 注意事项

##### 同时写入多个数据,但是剪贴板只有一个

如果你使用的是 window 10 机器，可以用 win + v 开启电脑自带的剪贴板，来查看情况

```js
const imgURL =
  "https://img2.baidu.com/it/u=124320768,1699059114&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500";
const data = await fetch(imgURL);
const blob = await data.blob();
asyncClipboardUtils({
  type: "write-text",
  text: "",
  clipboardItem: new ClipboardItem({
    "text/plain": text,
    [blob.type]: blob,
  }),
});
```

当像上文代码一样，clipboardItem 内有多项写入的值，但是实际上只有最后一项会被写入到用户的剪贴板

因为我们一次性写入的数据，只会对剪贴板中的一个位置进行写入，所以会出现覆盖写入的情况，用 window 自带的剪贴板可以观察到这种情况，比如当我们把最后一项放入第一个位置时，那么最后一个位置就会被成功写入到用户的剪贴板

##### 读取用户剪贴板的内容,但是读取的内容比用剪贴板查看到内容多

如果你在网页上复制文字，那么你用剪贴板查看，是只有一项内容的，但是实际上把网页上的 HTML 标签也复制上去了，但是剪贴板上是看不见的，这就会导致读取用户通过网页或者 Word 之类的复制过来的文本，会导致读取内容返回的数组里面也会带有标签的文字数据

比如 Edge 浏览器设置里面可以跳转复制是否复制网页标签

## English

### Introduce

#### What is async clipboard utils

Async clipboard utils is a simple tool class for clipboard operations

Async clipboard utils is implemented using pure JavaScript, which means that it is independent

The implementation of async clipboard utils has only a small amount of code, which means that it is also lightweight

Async clipboard utils does not support IE browser because ie does not support the clipboard API

### Install

#### NPM

Async clipboard utils is hosted on NPM. Execute the following command to install

```js
npm i async-clipboard-utils
```

Then you can introduce it into the code

```js
import { asyncClipboardUtils } from "async-clipboard-utils";
```

### Start

The most common application scenario of async clipboard utils is that you want to operate on the user's clipboard

#### Init Code

```js
import { asyncClipboardUtils } from "async-clipboard-utils";

asyncClipboardUtils({
  type: "write-text",
  text: "测试写入",
  clipboardItem: null,
  writeSuccess: function () {},
  writeError: function (error) {},
  readSuccess: function (text) {},
  readError: function (error) {},
  error: function () {},
});
```

This initializes the code that writes text to the user clipboard once

#### Basic configuration

Async clipboard utils has four operations in total

1. Write text: write text
2. Write all: write text and binary data (pictures, etc.)
3. Read text: read user text
4. Read all: read text or binary data (pictures, etc.)
   > Chrome browser only supports reading and writing PNG format picture

Async clipboard utils has 9 status codes to judge different behaviors and states

> If the user refuses the clipboard operation request sent by the clipboard API, it will enter the failed state

- 1: 'write text' callback parameters after successful execution

- 2. Callback parameters after 'write all' is successfully executed

- 3: 'read text' callback parameters after successful execution

- 4. Callback parameters after successful execution of 'read all'

- -1: 'write text' callback parameters after execution failure

- -2: callback parameters after 'write all' execution failure

- -3: 'read text' callback parameters after execution failure

- -4: callback parameters after 'read all' execution failure

- -99: if the user's browser version does not support the clipboard API

Async clipboard utils has only one parameter in object format

#### parameter

- type: the value is a string, and the range of values is any one of the four operations

- text: the value is a string. It takes effect when the type is' write text 'and will be written to the clipboard

- clipboardItem: the value is the instance of the clipboarditem object. The clipboarditem needs to be instantiated. The parameter is an object

```js
new ClipboardItem({
  "text/plain": "I'm going to be written",
});
```

The key of the object is the MIME type string of the data, and the value is the value (which can be a binary value)

This field only takes effect when the type is' write all '

Common MIME type strings are given below

```text
Plain text Txt text/plain

Png image Png image/png

Gif graphics Gif image/gif

JPEG graphics JPEG Jpg image/jpeg

XML document XML text/xml

XHTML document XHTML application/xhtml+xml
```

- writeSuccess: the callback after a successful write. Both 'write text' and 'write all' will trigger this function. When this function is triggered, there is a parameter of numerical type. The function triggered by different behaviors will have numerical parameters with different results. The parameter 'write text' is' 1 'and the parameter' write all 'is' 2'

- writeError: callback after write failure. Both 'write text' and 'write all' will trigger this function. This function has a parameter of numerical type when it is triggered. This function triggered by different behaviors will have numerical parameters with different results. The parameter of 'write text' is' -1 'and the parameter of' write all 'is' -2'

- readSuccess: the callback after reading the user's clipboard. Readsuccess has two parameters. The first parameter is an array type and the value is the value read from the clipboard. If the clipboard is empty, the value is an empty array‘ Both 'read text' and 'read all' will trigger this function. When this function is triggered, there is a parameter of numerical type. This function triggered by different behaviors will have numerical parameters with different results. The parameter 'read text' is' 3 'and the parameter' read all 'is' 4',

- readError: a callback that fails to read the user's clipboard. Both 'read text' and 'read all' will trigger this function. When this function is triggered, there is a parameter of numerical type. This function triggered by different behaviors will have numerical parameters of different results. The parameter of 'read text' is' -3 ',The parameter of 'read all' is' -4 '

- error: the callback when the user browser does not support this API. When the user browser does not support this API, other operations will not be performed

> For all error failed callbacks, a total of 2 parameters will be received. The first parameter is the error object, and the second parameter is an array type parameterOnly the error callback does not return an error object

### Common operation

#### Write image

> Chrome browser only supports reading and writing PNG format picture

```js
const imgURL =
  "https://img2.baidu.com/it/u=124320768,1699059114&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500";
const data = await fetch(imgURL);
const blob = await data.blob();
asyncClipboardUtils({
  type: "write-text",
  text: "",
  clipboardItem: new ClipboardItem({
    [blob.type]: blob,
  }),
});
```

#### Attention

##### Write multiple data at the same time, but there is only one clipboard

If you are using a window 10 machine, you can use Win + V to open the computer's own clipboard to view the situation

```js
const imgURL =
  "https://img2.baidu.com/it/u=124320768,1699059114&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500";
const data = await fetch(imgURL);
const blob = await data.blob();
asyncClipboardUtils({
  type: "write-text",
  text: "",
  clipboardItem: new ClipboardItem({
    "text/plain": text,
    [blob.type]: blob,
  }),
});
```

As in the above code, there are multiple written values in the clipboarditem, but actually only the last item will be written to the user's clipboard

Because the data we write at one time will only be written to one position in the clipboard, overwriting writing will occur. This can be observed with the clipboard built in the window. For example, when we put the last item in the first position, the last position will be successfully written to the user's clipboard

##### Reads the contents of the user's clipboard, but reads more than can be viewed with the clipboard

If you copy text on a web page, you can use the clipboard to view it. There is only one item of content, but the HTML tag on the web page is also copied, but the clipboard is invisible. This will lead to reading the text copied by the user through the web page or word, and the text data with the tag in the array returned from reading the content

For example, in the edge browser settings, you can jump to copy whether to copy web page tags
