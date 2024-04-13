


function parseFolder(ownerId, name, parentFolderId) {
    const data = {
        name,
        owner: { connect: { id: ownerId } }
    };

    if (parentFolderId) {
        data.parentFolder = { connect: { id: parentFolderId } };
    }

    return data;
}

export default parseFolder;