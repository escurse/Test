const $form = document.getElementById('form');
const $result = $form.querySelector(':scope > .result');

$form.onsubmit = (e) => {
    e.preventDefault();
    const $op = $form['op'];
    const $title = $form['title'];
    const $textarea = $form['content'];
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        if (xhr.status < 200 || xhr.status >= 300) {
            alert('요청을 전송하지 못했습니다.');
            return;
        }
        const response = JSON.parse(xhr.responseText);
        if (response['result'] === 'failure') {
            $result.classList.remove('--success');
            $result.classList.add('--failure');
            $result.innerText = '글 작성에 실패하였습니다. 잠시 후 다시 시도해 주세요.'
        } else {
            $result.classList.remove('--failure');
            $result.classList.add('--success');
            $result.innerText = `성공적으로 글을 작성하였습니다. 작성된 게시글의 번호는 ${response['index']}입니다.`
        }
    }
    const url = new URL('http://192.168.4.252:24122/article/write');
    url.searchParams.set('board', $op.value);
    url.searchParams.set('title', $title.value);
    url.searchParams.set('content', $textarea.value);
    xhr.open('GET', url.toString());
    xhr.send();
}
