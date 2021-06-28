App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  flag: true,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("PropertyRegistration.json", function(PropertyRegistration) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.PropertyRegistration = TruffleContract(PropertyRegistration);
      // Connect provider to interact with contract
      App.contracts.PropertyRegistration.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  listenForEvents: function() {
    App.contracts.PropertyRegistration.deployed().then(function(instance) {

      instance.successEvent({}, {fromBlock: 'latest', toBlock: 'latest'}).watch(function(error, event) {
          if(App.flag) {
            App.flag = false;
            alert(event.args.message);
          }
      });

      instance.invalidEvent({}, {fromBlock: 'latest', toBlock: 'latest'}).watch(function(error, event) {
          if(App.flag) {
            App.flag = false;
            alert(event.args.message);
          }
      });

      instance.properyRegisteredEvent({}, {fromBlock: 'latest', toBlock: 'latest'}).watch(function(error, event) {
          if(App.flag) {
            App.flag = false;
            alert("Successfully registerd the property, transaction ID: " + event.args.transactionID);
          }
      });

      instance.properyTransferredEvent({}, {fromBlock: 'latest', toBlock: 'latest'}).watch(function(error, event) {
          if(App.flag) {
            App.flag = false;
            alert("Successfully transferred the property, transaction ID: " + event.args.transactionID);
          }
      });

    });
  },

  render: function() {

    console.log("Render");

    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });
  },

  enableRegisterUser : function() {
    console.log("enableRegisterUser");
    App.flag = true;
    var rU = $("#rU");  rU.empty();
    var rP = $("#rP");  rP.empty();
    var tP = $("#tP");  tP.empty();
    var dP = $("#dP");  dP.empty();
    var out = $("#out"); out.empty();
    var out2 = $("#out2"); out2.empty();

    rU.append("<tr><td>" + "<input type=\"text\" placeholder=\"&emsp;Identity Proof\" id=\"rUID\"/>" + "</td></tr>");
    rU.append("<tr><td>" + "<input type=\"text\" placeholder=\"&emsp;Name\" id=\"rUName\"/>" + "</td></tr>");
    rU.append("<tr><td>" + "<input type=\"password\" placeholder=\"&emsp;Password\" id=\"rUPassword\"/>" + "</td></tr>");
    rU.append("<tr><td>" + "<button type=\"button\" class=\"btn btn-primary\" onClick=\"App.registerUser();\">Submit</button>" + "</td></tr>");
  },

  enableRegisterProperty : function() {
    console.log("enableRegisterProperty");
    App.flag = true;
    var rU = $("#rU");  rU.empty();
    var rP = $("#rP");  rP.empty();
    var tP = $("#tP");  tP.empty();
    var dP = $("#dP");  dP.empty();
    var out = $("#out"); out.empty();
    var out2 = $("#out2"); out2.empty();

    rP.append("<tr><td>" + "<input type=\"text\" placeholder=\"&emsp;Owner ID\" id=\"rPOID\"/>" + "</td></tr>");
    rP.append("<tr><td>" + "<input type=\"text\" placeholder=\"&emsp;Owner Name\" id=\"rPOName\"/>" + "</td></tr>");
    rP.append("<tr><td>" + "<input type=\"password\" placeholder=\"&emsp;Password\" id=\"rPOPassword\"/>" + "</td></tr>");
    rP.append("<tr><td>" + "<input type=\"text\" placeholder=\"&emsp;Property ID\" id=\"rPPID\"/>" + "</td></tr>");
    rP.append("<tr><td>" + "<input type=\"text\" placeholder=\"&emsp;Property Type\" id=\"rPPType\"/>" + "</td></tr>");
    rP.append("<tr><td>" + "<input type=\"text\" placeholder=\"&emsp;Property Address\" id=\"rPPAddress\"/>" + "</td></tr>");
    rP.append("<tr><td>" + "<input type=\"text\" placeholder=\"&emsp;Property Dimensions\" id=\"rPPDimens\"/>" + "</td></tr>");
    rP.append("<tr><td>" + "<button type=\"button\" class=\"btn btn-primary\" onClick=\"App.registerProperty();\">Submit</button>" + "</td></tr>");
  },

  enableTransferProperty : function() {
    console.log("enableRegisterProperty");
    App.flag = true;
    var rU = $("#rU");  rU.empty();
    var rP = $("#rP");  rP.empty();
    var tP = $("#tP");  tP.empty();
    var dP = $("#dP");  dP.empty();
    var out = $("#out"); out.empty();
    var out2 = $("#out2"); out2.empty();

    tP.append("<tr><td>" + "<input type=\"text\" placeholder=\"&emsp;Property ID\" id=\"tPPID\"/>" + "</td></tr>");
    tP.append("<tr><td>" + "<input type=\"text\" placeholder=\"&emsp;Seller ID\" id=\"tPSID\"/>" + "</td></tr>");
    tP.append("<tr><td>" + "<input type=\"text\" placeholder=\"&emsp;Seller Name\" id=\"tPSName\"/>" + "</td></tr>");
    tP.append("<tr><td>" + "<input type=\"password\" placeholder=\"&emsp;Password\" id=\"tPSPassword\"/>" + "</td></tr>");
    tP.append("<tr><td>" + "<input type=\"text\" placeholder=\"&emsp;Buyer ID\" id=\"tPBID\"/>" + "</td></tr>");
    tP.append("<tr><td>" + "<input type=\"text\" placeholder=\"&emsp;Buyer Name\" id=\"tPBName\"/>" + "</td></tr>");
    tP.append("<tr><td>" + "<input type=\"text\" placeholder=\"&emsp;Amount (Ethers)\" id=\"tPAmount\"/>" + "</td></tr>");
    tP.append("<tr><td>" + "<button type=\"button\" class=\"btn btn-primary\" onClick=\"App.transferProperty();\">Submit</button>" + "</td></tr>");
  },

  enableSearchProperty : function() {
    console.log("enableSearchProperty");
    App.flag = true;
    var rU = $("#rU");  rU.empty();
    var rP = $("#rP");  rP.empty();
    var tP = $("#tP");  tP.empty();
    var dP = $("#dP");  dP.empty();
    var out = $("#out"); out.empty();
    var out2 = $("#out2"); out2.empty();

    dP.append("<tr><td>" + "<input type=\"text\" placeholder=\"&emsp;Property ID\" id=\"dPID\"/><button type=\"text\" class=\"btn btn-primary\" onClick=\"App.getProperty();\">Submit</button>" + "</td></tr>");
  },

  registerUser : function() {
    App.flag = true;
    var ID = parseInt(document.getElementById("rUID").value);
    var name = document.getElementById("rUName").value;
    var password = document.getElementById("rUPassword").value;
    App.contracts.PropertyRegistration.deployed().then(function(instance) {
      return instance.registerUser(ID, name, password, { from: App.account });
    });
  },

  registerProperty : function() {
    App.flag = true;
    var oID = parseInt(document.getElementById("rPOID").value);
    var oName = document.getElementById("rPOName").value;
    var oPassword = document.getElementById("rPOPassword").value;
    var pID = parseInt(document.getElementById("rPPID").value);
    var pType = document.getElementById("rPPType").value;
    var pAddress = document.getElementById("rPPAddress").value;
    var pDimens = document.getElementById("rPPDimens").value;

    App.contracts.PropertyRegistration.deployed().then(function(instance) {
      return instance.registerProperty(oID, oName, oPassword, pID, pType, pDimens, pAddress, new Date().toString(), { from: App.account });
    });
  },

  transferProperty : function() {
    App.flag = true;
    var pID = parseInt(document.getElementById("tPPID").value);
    var sID = parseInt(document.getElementById("tPSID").value);
    var sName = document.getElementById("tPSName").value;
    var sPassword = document.getElementById("tPSPassword").value;
    var bID = parseInt(document.getElementById("tPBID").value);
    var bName = document.getElementById("tPBName").value;
    var amount = parseInt(document.getElementById("tPAmount").value);
    console.log(sPassword);
    App.contracts.PropertyRegistration.deployed().then(function(instance) {
      return instance.transferProperty(pID, sID, sName, sPassword, bID, bName, amount, new Date().toString(), { from: App.account });
    });
  },

  getProperty : function() {
    App.flag = true;
    var propertyID = parseInt(document.getElementById("dPID").value);
    App.contracts.PropertyRegistration.deployed().then(function(instance) {
      return instance.getPropertyByID(propertyID,  { from: App.account }).then( function(result) {
        var out = $("#out");
        out.empty();
        if(result[0]==0) {
          alert("Property not found");
          return;
        }
        out.append("<tr><td>Property ID: " + result[0].toNumber() + "</td></tr>");
        out.append("<tr><td>Property Type: " + result[1] + "</td></tr>");
        out.append("<tr><td>Property Address: " + result[2] + "</td></tr>");
        out.append("<tr><td>Property Dimensions: " + result[3] + "</td></tr>");
        out.append("<tr><td>Owner ID: " + result[4].toNumber() + "</td></tr>");
        out.append("<tr><td>Owner Name: " + result[5] + "</td></tr>");
        out.append("<tr><td>Purchased: " + result[6] + "</td></tr>");

        var prevOwnersCount = result[7].toNumber();
        var out2 = $("#out2");
        out2.empty();
        out2.append("<caption><strong>Previous Owners</strong></caption>");
        out2.append("<tbody>");
        out2.append("<tr><th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID</th><th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name</th></tr>");
        for(var i=0; i<prevOwnersCount; ++i) {
          instance.getPrevOwner(propertyID, i,  { from: App.account }).then(function(result) {
            out2.append("<tr><td>" + result[0] + "</td><td>" + result[1] + "</td></tr>");
          })
        }
        out2.append("</tbody>");
      })
    });
  },
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});