
chrome.commands.onCommand.addListener(function(command) {
  switch(command) {
    case "new-tab-in-group":
      createNewTabInCurrentGroup()
      break;
    case "collapse-all-groups":
      collapseOrExpandAllGroups(true);
      break;
    case "expand-all-groups":
      collapseOrExpandAllGroups(false);
      break;
    default:
      console.log("Not implemented");
  }

});


function createNewTabInCurrentGroup() {
  chrome.tabs.query({currentWindow: true, active: true}, function(foo) {
      var cur = foo[0];
      chrome.tabs.create({index: cur.index+1}, function(bar) {
          chrome.tabs.group({tabIds: bar.id, groupId: cur.groupId});
      });
  });
}

function collapseOrExpandAllGroups(shouldCollapse) {
  chrome.tabGroups.query({}, function(groups) {
      var groupIDs = groups.map(group => group.id);
      groupIDs.forEach( id => {
        chrome.tabGroups.update(id, {collapsed: shouldCollapse});
      });
  });
}

