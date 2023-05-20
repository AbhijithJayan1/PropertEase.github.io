var regnum, typeV, locV, rentV, depoV;

function readFom() {
  regnum = document.getElementById("regno").value;
  typeV = document.getElementById("type").value;
  locV = document.getElementById("loc").value;
  rentV = document.getElementById("rent").value;
  depoV = document.getElementById("depo").value;
}
var Sregno = sessionStorage.getItem('regno');
var imgurl="";
var database = firebase.database();
var landlordRef = database.ref("Landlord/"+Sregno);
var statusRef = landlordRef.child('Status');

statusRef.once('value').then(function(snapshot) {
  var statusData = snapshot.val();
  console.log(statusData);
  globalStatusData = statusData;
});

window.onload = function() {
  firebase.database().ref("Property/").orderByKey().limitToLast(1).on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
          var num= childSnapshot.key;
        document.getElementById("regno").value = ++num;
        // Do something with the last registration number
      });
    });
  }; 

document.getElementById("insert").onclick = function () {
  readFom();
  if(regnum=="" || typeV=="" || locV=="" || rentV=="" || depoV=="")
  {
    alert("All Data must be filled");
    document.getElementById("regno").value = "";
    document.getElementById("type").value = "";
    document.getElementById("loc").value = "";
    document.getElementById("rent").value = "";
    document.getElementById("depo").value = "";
  }
  else if(globalStatusData=="Approved"){
  firebase.database().ref("Owns/" + Sregno).update({[regnum]: true});
  firebase.database().ref("Property/" + regnum).set({Landlord: Sregno, Reg_No: regnum, type: typeV, location: locV, rent: rentV, deposit: depoV, interest: "", Tenant: "",contract_Status: "Not started", contract_addr: "", TDate:"",contract_No:"",S_date:"",L_date:"",period:"",image: imgurl});
  

  alert("Data Inserted");
    document.getElementById("regno").value = "";
    document.getElementById("type").value = "";
    document.getElementById("loc").value = "";
    document.getElementById("rent").value = "";
    document.getElementById("depo").value = "";
  }
  else{
    alert("Landlord "+Sregno+" is not Approved by Admin");
    document.getElementById("regno").value = "";
    document.getElementById("type").value = "";
    document.getElementById("loc").value = "";
    document.getElementById("rent").value = "";
    document.getElementById("depo").value = "";
  }
};

function uploadImage() {
  const fileInput = document.getElementById('imageInput');
  const file = fileInput.files[0];
  const storageRef = firebase.storage().ref();
  const filename = generateFilename(file.name);
  const imageRef = storageRef.child(filename);
  const uploadTask = imageRef.put(file);
  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      alert('Upload is ' + progress + '% done');
    },
    (error) => {
      alert('Error uploading image:', error);
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        imgurl=downloadURL;
        console.log('Image uploaded. Download URL:', downloadURL);
      });
    }
  );
}

function generateFilename(originalFilename) {
  const timestamp = new Date().getTime();
  const extension = originalFilename.split('.').pop();
  return timestamp + '.' + extension;
}

var selectedLatitude;
    var selectedLongitude;
    var map;

    function openModal() {
      var modal = document.getElementById('myModal');
      modal.style.display = 'block';

      // Load the map when the modal is opened
      loadMap();
    }

    function closeModal() {
      var modal = document.getElementById('myModal');
      modal.style.display = 'none';

      // Clear the recorded coordinates
      selectedLatitude = null;
      selectedLongitude = null;
      document.getElementById('latitude').textContent = '';
      document.getElementById('longitude').textContent = '';
    }

    function loadMap() {
      var mapContainer = document.getElementById('mapContainer');

      map = L.map(mapContainer).setView([9.9312, 76.2673], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add click event listener to the map
      map.on('click', function (event) {
        selectedLatitude = event.latlng.lat;
        selectedLongitude = event.latlng.lng;

        // Update the coordinates on the page
        document.getElementById('latitude').textContent = selectedLatitude;
        document.getElementById('longitude').textContent = selectedLongitude;
      });
    }

    function recordCoordinates() {
      if (selectedLatitude && selectedLongitude) {
        // Perform any desired action with the coordinates
        console.log('Recorded coordinates:', selectedLatitude, selectedLongitude);
        document.getElementById('lat').value = selectedLatitude;
        document.getElementById('log').value = selectedLongitude;
        closeModal()
      }
    }
    

/*
window.onload = function() {
firebase.database().ref("Tenant").orderByKey().limitToLast(1).on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var num= childSnapshot.key;
      document.getElementById("regno").value = ++num;
      // Do something with the last registration number
    });
  });
}; 
/*
document.getElementById("update").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("student/" + regnum)
    .update({
      //   rollNo: regnum,
      name: nameV,
      gender: genderV,
      address: addressV,
    });
  alert("Data Update");
  document.getElementById("roll").value = "";
  document.getElementById("name").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("address").value = "";
};

document.getElementById("delete").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("student/" + regnum)
    .remove();
  alert("Data Deleted");
  document.getElementById("roll").value = "";
  document.getElementById("name").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("address").value = "";
};
*/
