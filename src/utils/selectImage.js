// 选择一个图片
export default async function selectImg() {
    const arrFileHandle = await window.showOpenFilePicker({
        types: [{
            description: 'Images',
            accept: {
                'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.webp']
            }
        }],
        multiple: false
    });
    return await arrFileHandle[0].getFile();
}