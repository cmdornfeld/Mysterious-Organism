// Provided by Codecademy
// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Provided by Codecademy
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  
  // My pAequorFactory design
  const pAequorFactory = (num, array) => {
    return {
      specimenNum:  num,
      dna: array,
      // method to compare the current organism to a second organism
      // checks if the DNA base is a match at each index and returns the percent match
      compareDNA(specimen){
        let count = 0;
        for (let i=0; i<specimen.dna.length; i++) {
          if (specimen.dna[i] === this.dna[i]) {
              count++
          }
        }
        return `Specimen ${specimen.specimenNum} and specimen ${this.specimenNum} have ${Math.floor((count / specimen.dna.length) * 100)}% DNA in common`;
      },
      // method to change a random DNA base to a different base
      // randomly selects a DNA base to change and a new base.  If they match, the method
      // runs again.  If it does not, that base mutates to the randomly selected base
      mutate(){
        let randomIndexToChange = Math.floor(Math.random() * this.dna.length);
        let randomBase = returnRandBase();
        if (this.dna[randomIndexToChange] !== randomBase){
          this.dna[randomIndexToChange] = randomBase;
        } else {
          console.log(`matched, running mutate again`);
          this.mutate();
        }
        return this.dna;
      },
      // method to check the viability of the organism
      // checks to see if the amount of 'C' and 'G' bases of the organism is equal or
      // greater than 60%
      willLikelySurvive(){
        let baseCount = this.dna.reduce( (count, base) => {
          count[base] = (count[base] || 0) + 1;
          return count;
        }, {});
        let cAndG = baseCount.C + baseCount.G;
        return cAndG / this.dna.length >= 0.6
      }
    }
  }
  
  // creating 30 organisms that are likely to survive (have 60% or greater C and G bases)
  let survivingStrands = [];
  let specimenId = 1;
  
  while (survivingStrands.length < 30) {
    let newDNA = pAequorFactory(specimenId, mockUpStrand());
    if (newDNA.willLikelySurvive()) {
      survivingStrands.push(newDNA);
    }
    specimenId++;
  }
  
  //   console.log(survivingStrands);
  
  