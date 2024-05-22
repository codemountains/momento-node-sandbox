import { CacheClient, CacheGet, CacheListFetch, CacheListPopBack, CacheListPopFront, CacheListPushBack, CacheListPushFront, CacheListRemoveValue, Configurations, CredentialProvider } from "@gomomento/sdk";

const CACHE_NAME = 'momento-sandbox';

// キャッシュクライアントの生成
const genClient = async () => {
    return await CacheClient.create({
            configuration: Configurations.Laptop.v1(),
            credentialProvider: CredentialProvider.fromEnvironmentVariable({
            environmentVariableName: 'MOMENTO_API_KEY',
        }),
        defaultTtlSeconds: 300,
    });
};

// Set and Get...
genClient().then(async (client) => {
    // キャッシュをセットする
    await client.set(CACHE_NAME, 'my_key', 'Hello_world');

    // キャッシュを取得する
    const result = await client.get(CACHE_NAME, 'my_key');

    if (result instanceof CacheGet.Hit) {
        console.log(result);
        console.log(result.valueString());
    } else if (result instanceof CacheGet.Miss) {
        console.log(result);
    } else if (result instanceof CacheGet.Error) {
        console.error(result);
    }
    // キャッシュを削除する
    await client.delete(CACHE_NAME, 'my_list_key');
}).catch((error) => {
    console.error(error);
});

// ListConcatenateBack and ListConcatenateFront...
genClient().then(async (client) => {
    // 配列をセットする
    await client.listConcatenateBack(CACHE_NAME, 'my_list_key', ["a", "b", "c"]);

    // 末尾に配列を連結する
    await client.listConcatenateBack(CACHE_NAME, 'my_list_key', ["d", "e", "f"]);

    // 先頭に配列を連結する
    await client.listConcatenateFront(CACHE_NAME, 'my_list_key', ["g", "h", "i"]);

    // キャッシュを取得する
    const result = await client.listFetch(CACHE_NAME, 'my_list_key');

    if (result instanceof CacheListFetch.Hit) {
        console.log(result);
        console.log(result.valueListString());
    } else if (result instanceof CacheListFetch.Miss) {
        console.log(result);
    } else if (result instanceof CacheListFetch.Error) {
        console.error(result);
    }

    // キャッシュを削除する
    await client.delete(CACHE_NAME, 'my_list_key');
}).catch((error) => {
    console.error(error);
});

// ListPopBack and ListPopFront...
genClient().then(async (client) => {
    // 配列をセットする
    await client.listConcatenateBack(CACHE_NAME, 'my_list_key', ["a", "b", "c"]);

    // 末尾に要素を削除する
    const listPopBackResult = await client.listPopBack(CACHE_NAME, 'my_list_key');
    if (listPopBackResult instanceof CacheListPopBack.Hit) {
        console.log(listPopBackResult);
        console.log(`Removed value: ${listPopBackResult.valueString()}`);
    }

    // 先頭に要素を削除する
    const listPopFrontResult = await client.listPopFront(CACHE_NAME, 'my_list_key');
    if (listPopFrontResult instanceof CacheListPopFront.Hit) {
        console.log(listPopFrontResult);
        console.log(`Removed value: ${listPopFrontResult.valueString()}`);
    }

    // キャッシュを取得する
    const result = await client.listFetch(CACHE_NAME, 'my_list_key');

    if (result instanceof CacheListFetch.Hit) {
        console.log(result);
        console.log(result.valueListString());
    } else if (result instanceof CacheListFetch.Miss) {
        console.log(result);
    } else if (result instanceof CacheListFetch.Error) {
        console.error(result);
    }

    // キャッシュを削除する
    await client.delete(CACHE_NAME, 'my_list_key');
}).catch((error) => {
    console.error(error);
});

// ListPushBack and ListPushFront...
genClient().then(async (client) => {
    // 配列をセットする
    await client.listConcatenateBack(CACHE_NAME, 'my_list_key', ["a", "b", "c"]);

    // 末尾に要素を追加する
    const listPopBackResult = await client.listPushBack(CACHE_NAME, 'my_list_key', "d");
    if (listPopBackResult instanceof CacheListPushBack.Success) {
        console.log(listPopBackResult);
        console.log(`List length: ${listPopBackResult.listLength()}`);
    }

    // 先頭に要素を追加する
    const listPopFrontResult = await client.listPushFront(CACHE_NAME, 'my_list_key', "e");
    if (listPopFrontResult instanceof CacheListPushFront.Success) {
        console.log(listPopFrontResult);
        console.log(`List length: ${listPopFrontResult.listLength()}`);
    }

    // キャッシュを取得する
    const result = await client.listFetch(CACHE_NAME, 'my_list_key');

    if (result instanceof CacheListFetch.Hit) {
        console.log(result);
        console.log(result.valueListString());
    } else if (result instanceof CacheListFetch.Miss) {
        console.log(result);
    } else if (result instanceof CacheListFetch.Error) {
        console.error(result);
    }

    // キャッシュを削除する
    await client.delete(CACHE_NAME, 'my_list_key');
}).catch((error) => {
    console.error(error);
});

// ListRemoveValue...
genClient().then(async (client) => {
    // 配列をセットする
    await client.listConcatenateBack(CACHE_NAME, 'my_list_key', ["a", "b", "c"]);

    // 指定した要素を削除する
    const listPopBackResult = await client.listRemoveValue(CACHE_NAME, 'my_list_key', "b");
    if (listPopBackResult instanceof CacheListRemoveValue.Success) {
        console.log(listPopBackResult);
        console.log(`isSuccess: ${listPopBackResult.is_success}`);
    }

    // キャッシュを取得する
    const result = await client.listFetch(CACHE_NAME, 'my_list_key');

    if (result instanceof CacheListFetch.Hit) {
        console.log(result);
        console.log(result.valueListString());
    } else if (result instanceof CacheListFetch.Miss) {
        console.log(result);
    } else if (result instanceof CacheListFetch.Error) {
        console.error(result);
    }

    // キャッシュを削除する
    await client.delete(CACHE_NAME, 'my_list_key');
}).catch((error) => {
    console.error(error);
});
