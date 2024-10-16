const $form = document.getElementById('form');
const $result = document.querySelector('.result');

$form.onsubmit = (e) => {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        if (xhr.status < 200 || xhr.status >= 300) {
            return;
        }
        const response = JSON.parse(xhr.responseText);
        if (response['result'] === 'success') {
            $result.classList.add('--success');
            $result.innerText = '메모를 성공적으로 작성하였습니다.';
        } else {
            $result.classList.add('--failure');
            $result.innerText = '메모를 작성하지 못하였습니다.';
        }
    }
    const $writer = $form['writer'];
    const $content = $form['content'];
    const url = new URL('http://192.168.4.252:24122/memo/')
    url.searchParams.set('writer', $writer.value);
    url.searchParams.set('content', $content.value);
    xhr.open('GET', url.toString());
    xhr.send();
}
