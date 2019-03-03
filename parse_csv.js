/*
 Code to parse a CSV with the given format:

 Name, User handle, Repository link, Group Number


*/

function do_upload(file){
    var reader = new FileReader();
    reader.readAsText(fileUpload.files[0]);
    
    reader.onload = (e) => {
        var rows = e.target.result.split("\r\n");
        var groups = {};

        if (rows.length < 1) {
            alert("Empty csv file");
            return
        }

        for (var i = 0; i < rows.length; i++) {
            if(rows[i] == "") continue
         
            const cells = rows[i].split(",");
            const group_number = cells[3];
            const student_detail = {name: cells[0], gh_handle: cells[1], repository: cells[2]};

            if (group_number in groups){
                groups[group_number].push(student_detail)
            } else {
                groups[group_number] = [student_detail];
            }
        }

        for (var key in groups) {
            localStorage.setItem(key, JSON.stringify(groups[key]));
        }
    }
    document.getElementById("fileUpload").value = "";

}




function upload() {
    var fileUpload = document.getElementById("fileUpload");

    if (!fileUpload.value.endsWith(".csv") && !fileUpload.value.endsWith(".txt")){
        alert("Please upload a valid CSV file.");
    } else if (typeof(FileReader) == "undefined" && typeof(Storage) == "undefined"){
        alert("This browser does not support HTML5.");
    } else {
        do_upload(fileUpload);
    }
}