const make = function() {
    console.log("make");
}

const makeAnagrams = function(head, arr, shuffle) {

    try {
        const skipCap = [
            "っ", "ん", "ゃ", "ゅ", "ょ", "ぁ", "ぃ", "ぅ", "ぇ", "ぉ",
        ];
        if (head.length >= shuffle - 1) {
            // ここでさらに一文字足すのでshuffleは-1
            const ret = [];
            for (let i = 0; i < arr.length; i++) {
                const remines = arr.concat(); // 複製
                const char = remines.splice(i, 1)[0];
                const anagram = head + char;
                const data = {
                    anagram: anagram,
                    remines: remines,
                };
                // console.log(data);
                ret.push(data);
            }
            return ret;
        } else {
            // 次へ
            let ret = [];
            for (let i = 0; i < arr.length; i++) {
                // 配列をコピー
                const next = arr.concat(); // 複製
                const char = next.splice(i, 1)[0];
                const text = head + char;
                if (head.length === 0) {
                    // 先頭にはつかない文字なら飛ばす
                    if (skipCap.includes(char)) {
                        continue;
                    }
                }
                const ana = makeAnagrams(text, next, shuffle);
                ret = ret.concat(ana);
            }
            return ret;
        }
    } catch (e) {
        // エラー
        return [];
    }
};
