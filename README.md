cookieutil
==========

a easy way to handle cookie

## 使用说明


### get *cookie.get(name, filter)*

获取 cookie 值。`filter` 为对取值进行过滤操作：

如果要获取的 cookie 键值不存在，则返回 `undefined`.



### set *cookie.set(name, value, [options])*

设置 cookie 值。参数 `options` 可选，可以有以下属性：`path`（字符串）、`domain`（字符串）、
`expires`（数值或日期对象）、`raw`（布尔值）。

例子：


### remove *Cookie.remove(name, [options])*

移除指定的 cookie.

