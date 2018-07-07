const isPassageSatisfied = ( passageTitle, requirement ) => {
  if(passageTitle == requirement) return true;
  const passageTitleParts = passageTitle.split('/');
  const requirementParts = requirement.split('/');
  if(passageTitleParts.length === requirementParts.length) return false;
  if(passageTitleParts.length > requirementParts.length) return false;
  return requirementParts.splice(0,passageTitleParts.length).join('/') === passageTitle;
}

export { isPassageSatisfied };