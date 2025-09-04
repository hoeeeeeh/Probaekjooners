function solution(skill, skill_trees) {
    let answer = 0;
    let prerequisite = {};
    for(let i = 0; i < skill.length; i++) {
        prerequisite[skill[i]] = i;
    }
    
    for(const skill_tree of skill_trees) {
        let curSkillIndex = 0;
        let isValidSkillTree = true;
        for(const skill of [...skill_tree]) {
            if(!prerequisite.hasOwnProperty(skill)) {
                continue;
            }
            
            if(prerequisite[skill] === curSkillIndex) {
                curSkillIndex += 1;
                continue;
            }
            
            isValidSkillTree = false;
            break;
        }
        
        if(isValidSkillTree) {
            answer += 1;
        }
    }
    return answer;
}