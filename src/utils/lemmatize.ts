const dictionary: { [key: string]: string } = {
    // Английский словарь
    running: 'run',
    ran: 'run',
    eaten: 'eat',
    eating: 'eat',
    driven: 'drive',
    driving: 'drive',
    wrote: 'write',
    written: 'write',
    writing: 'write',
    bought: 'buy',
    buying: 'buy',
    gave: 'give',
    given: 'give',
    taking: 'take',
    took: 'take',
    seen: 'see',
    seeing: 'see',
    thought: 'think',
    thinking: 'think',
    brought: 'bring',
    bringing: 'bring',
    came: 'come',
    coming: 'come',
    felt: 'feel',
    feeling: 'feel',
    found: 'find',
    finding: 'find',
    kept: 'keep',
    keeping: 'keep',
    left: 'leave',
    leaving: 'leave',
    made: 'make',
    making: 'make',
    saying: 'say',
    said: 'say',
    sent: 'send',
    sending: 'send',
    slept: 'sleep',
    sleeping: 'sleep',
    spoke: 'speak',
    spoken: 'speak',
    speaking: 'speak',
    stood: 'stand',
    standing: 'stand',
    taken: 'take',
    taught: 'teach',
    teaching: 'teach',
    told: 'tell',
    telling: 'tell',
    understood: 'understand',
    understanding: 'understand',
    won: 'win',
    winning: 'win',
    children: 'child',
    mice: 'mouse',
    geese: 'goose',
    feet: 'foot',
    teeth: 'tooth',
    men: 'man',
    women: 'woman',
    people: 'person',
    buses: 'bus',
    lives: 'life',
    leaves: 'leaf',
    knives: 'knife',
    halves: 'half',
    loaves: 'loaf',
    wives: 'wife',
    potatoes: 'potato',
    tomatoes: 'tomato',
    cacti: 'cactus',
    fungi: 'fungus',
    data: 'datum',
    criteria: 'criterion',
    better: 'good',
    best: 'good',
    worse: 'bad',
    worst: 'bad',
    happier: 'happy',
    happiest: 'happy',
    more: 'much',
    most: 'much',
    less: 'little',
    least: 'little',
    further: 'far',
    furthest: 'far',
    dogs: 'dog',
    cats: 'cat',
    houses: 'house',
    cars: 'car',
    trees: 'tree',
    cities: 'city',
    countries: 'country',
    did: 'do',
    does: 'do',
    has: 'have',
    had: 'have',
    goes: 'go',
    went: 'go',
    gone: 'go',
    is: 'be',
    am: 'be',
    are: 'be',
    was: 'be',
    were: 'be',
    being: 'be',
    been: 'be',

    // Русский словарь
    бегал: 'бегать',
    бегаю: 'бегать',
    бегали: 'бегать',
    бегая: 'бегать',
    сделал: 'сделать',
    делаю: 'делать',
    сделали: 'сделать',
    делая: 'делать',
    писал: 'писать',
    пишу: 'писать',
    писали: 'писать',
    написал: 'написать',
    напишу: 'написать',
    говорю: 'говорить',
    говорил: 'говорить',
    говорили: 'говорить',
    думал: 'думать',
    думаю: 'думать',
    думали: 'думать',
    кушал: 'кушать',
    кушаю: 'кушать',
    кушали: 'кушать',
};

export default function lemmatize(word: string) {
    // Проверяем в словаре
    if (dictionary[word.toLowerCase()]) {
        return dictionary[word.toLowerCase()];
    }

    // Простое правило для английских окончаний
    if (word.endsWith('ing') || word.endsWith('ed')) {
        return word.slice(0, -3);
    } else if (word.endsWith('s')) {
        return word.slice(0, -1);
    }

    // Простое правило для русских окончаний
    // if (word.endsWith('ая') || word.endsWith('яя')) {
    //     return word.slice(0, -2);
    // } else if (
    //     word.endsWith('ла') ||
    //     word.endsWith('ли') ||
    //     word.endsWith('ло')
    // ) {
    //     return word.slice(0, -1);
    // }
    if (word.endsWith('ла') || word.endsWith('ли') || word.endsWith('ло')) {
        return word.slice(0, -1);
    }

    return word;
}
