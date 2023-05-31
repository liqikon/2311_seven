
const resolver = {
    resolve: function resolve(options, callback) {
        // The string to resolve
        const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
        const combinedOptions = Object.assign({}, options, {
            resolveString: resolveString
        });

        function getRandomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        function randomCharacter(characters) {
            return characters[getRandomInteger(0, characters.length - 1)];
        };


        function doRandomiserEffect(options, callback) {
            const characters = options.characters;
            const element = options.element;
            const partialString = options.partialString;

            if (partialString.length === options.resolveString.length) {
                element.textContent = options.resolveString;
                if (typeof callback === "function") {
                    callback();
                }
            } else {
                let newString = '';
                for (let i = 0; i < options.resolveString.length; i++) {
                    newString += randomCharacter(characters);
                }
                element.textContent = newString;
                if (typeof callback === "function") {
                    callback();
                }
            }
        }


        function doResolverEffect(options, callback) {
            const resolveString = options.resolveString;
            const characters = options.characters;
            const offset = options.offset;
            const partialString = resolveString.substring(0, offset);
            const combinedOptions = Object.assign({}, options, {
                partialString: partialString
            });

            if (offset <= resolveString.length) {
                let newString = '';
                for (let i = 0; i < resolveString.length; i++) {
                    if (i < offset) {
                        newString += resolveString[i];
                    } else {
                        newString += randomCharacter(characters);
                    }
                }
                options.element.textContent = newString;

                setTimeout(() => {
                    const nextOptions = Object.assign({}, options, {
                        offset: offset + 1
                    });
                    doResolverEffect(nextOptions, callback);
                }, options.timeout);
            } else if (typeof callback === "function") {
                callback();
            }
        }


        doResolverEffect(combinedOptions, callback);
     
    }
}

/* Some GLaDOS quotes from Portal 2 chapter 9: The Part Where He Kills You
 * Source: http://theportalwiki.com/wiki/GLaDOS_voice_lines#Chapter_9:_The_Part_Where_He_Kills_You
 */
const strings = [
    'myself',
   
];

let counter = 0;

const options = {
    // Initial position
    offset: 0,
    // Timeout between each random character
    timeout: 80,
    // Number of random characters to show
    iterations: 10,
    // Random characters to pick from
    characters: ['$', '3', '8', 'd', '_', 'f', 'g', '!', '5', 'j', 'k', 'l', '2', 'n', '_', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
    // String to resolve
    resolveString: strings[counter],
    // The element
    element: document.querySelector('[data-target-resolver]')
}

// Callback function when resolve completes
function callback() {
    setTimeout(() => {
        counter++;

        if (counter >= strings.length) {
            counter = 0;
        }

        let nextOptions = Object.assign({}, options, {
            resolveString: strings[counter]
        });
        resolver.resolve(nextOptions, callback);
    }, 1500);
}
// 이벤트 핸들러 함수
function handleSubmit() {
    const input = document.querySelector("#string-input");
    const newString = input.value;

    // 새로운 문자열을 strings 배열에 추가
    strings.push(newString);

    // 입력값 초기화
    input.value = "";
}

// Submit 버튼 클릭 이벤트 리스너 등록
const submitBtn = document.querySelector("#submit-btn");
submitBtn.addEventListener("click", handleSubmit);

resolver.resolve(options, callback);