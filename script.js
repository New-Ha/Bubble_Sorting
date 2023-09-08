const container = document.getElementById('container');

function generateArray() {
    const array = [];
    // for문을 돌면서 15개의 랜덤한 숫자와 막대를 생성한다.
    for (let i = 0; i < 15; i++) {
        // 1~100 사이의 랜덤한 숫자 하나를 뽑는다.
        let num = Math.ceil(Math.random() * 100);
        array.push(num);
        // div 태그를 만들어 arr 변수에 저장하고, class를 지정해준다.
        // -> 막대그래프의 막대를 만드는 과정
        let arr = document.createElement('div');
        arr.classList.add('stick');
        // 랜덤한 숫자에 맞춰 막대의 높이를 지정해준다.
        arr.style.height = `${num * 3}px`;
        // 생성되는 막대를 순서대로 오른쪽으로 이동시켜 펼친다.
        arr.style.transform = `translate(${i * 35}px)`;

        // 막대 위에 숫자를 표시하기 위해 label 태그를 붙여준다.
        let numLabel = document.createElement('label');
        numLabel.classList.add('stickNum');
        numLabel.innerText = num;

        // arr(div, 막대)에 numLabel 을 자식요소로 넣어준다.
        arr.appendChild(numLabel);
        // arr를 container에 자식요소로 넣어준다.
        container.appendChild(arr);
    }
    console.log(`start 👉🏻 ${array}`);
    return array;
}

function swap(n1, n2) {
    return new Promise(resolve => {
        // 스타일을 교환 === 막대 위치 변경
        let temp = n1.style.transform;
        n1.style.transform = n2.style.transform;
        n2.style.transform = temp;

        window.requestAnimationFrame(function () {
            setTimeout(() => {
                container.insertBefore(n2, n1);
                resolve();
            }, 250);
        });
    });
}

async function BubbleSort(arr) {
    // 막대들을 모두 가져온다.
    let sticks = document.querySelectorAll('.stick');

    //버블 정렬
    for (let i = 0; i < sticks.length - 1; i++) {
        for (let j = 0; j < sticks.length - i - 1; j++) {
            // 선택된 막대 표시
            sticks[j].style.backgroundColor = '#ffad1e';
            sticks[j + 1].style.backgroundColor = '#ffad1e';

            await new Promise(resolve =>
                setTimeout(() => {
                    resolve();
                }, 100),
            );

            // 숫자를 비교해 swap 함수에 넣어 바꿔주고, 바뀐 순서대로 막대를 재정렬
            let num1 = Number(sticks[j].childNodes[0].innerText);
            let num2 = Number(sticks[j + 1].childNodes[0].innerText);
            if (num1 > num2) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                await swap(sticks[j], sticks[j + 1]);
                sticks = document.querySelectorAll('.stick ');
            }

            // 움직임이 끝나면 막대를 원래 색으로 돌려놓는다.
            sticks[j].style.backgroundColor = '#faebd7 ';
            sticks[j + 1].style.backgroundColor = '#faebd7 ';
        }
        // 이동이 끝난 맨 마지막 막대의 색을 바꿔준다.
        sticks[sticks.length - i - 1].style.backgroundColor = '#ff9999';
        console.log(`정렬 중 🫧 : ${arr}`);
    }
    console.log(`정렬 끝! 👉🏻 ${arr}`);
}

// 함수를 호출해 실행시킨다.
BubbleSort(generateArray());
