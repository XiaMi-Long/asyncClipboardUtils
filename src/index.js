/*
 * @Descripttion:
 * @version:
 * @Author: wwy
 * @Date: 2022-05-27 14:18:48
 * @LastEditors: wwy
 * @LastEditTime: 2022-05-27 14:29:00
 */
const asyncClipboardUtils = async function asyncClipboardUtils(config) {
  if (!navigator.clipboard) {
    await config.error(-99);
    return;
  }

  switch (config.type) {
    case "write-text":
      try {
        await navigator.clipboard.writeText(config.text);
        await config.writeSuccess(1);
      } catch (error) {
        await config.writeError(error, -1);
      }
      break;
    case "write-all":
      try {
        await navigator.clipboard.write([config.clipboardItem]);
        await config.writeSuccess(2);
      } catch (error) {
        await config.writeError(error, -2);
      }
      break;
    case "read-text":
      try {
        const text = await navigator.clipboard.readText();
        await config.readSuccess(text, 3);
      } catch (error) {
        await config.readError(error, -3);
      }

      break;
    case "read-all":
      try {
        const clipboardItems = await navigator.clipboard.read();

        if (clipboardItems.length === 0) {
          await config.readSuccess([], 4);
        }

        const result = [];

        for (const clipboardItem of clipboardItems) {
          for (const type of clipboardItem.types) {
            const blob = await clipboardItem.getType(type);
            if (blob.type.indexOf("image") !== -1) {
              result.push(URL.createObjectURL(blob));
              continue;
            }
            result.push(await new Response(blob).text());
          }
        }

        await config.readSuccess(result, 4);
      } catch (error) {
        await config.readError(error, -4);
      }
      break;
  }
};

module.exports = asyncClipboardUtils;
