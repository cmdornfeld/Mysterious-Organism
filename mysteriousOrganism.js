// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  
  const pAequorFactory = (num, array) => {
    return {
      specimenNum:  num,
      dna: array,
      compareDNA(specimen){
        let count = 0;
        for (let i=0; i<specimen.dna.length; i++) {
          if (specimen.dna[i] === this.dna[i]) {
              count++
          }
        }
        return `Specimen ${specimen.specimenNum} and specimen ${this.specimenNum} have ${Math.floor((count / specimen.dna.length) * 100)}% DNA in common`;
      },
      mutate(){
        let randomIndexToChange = Math.floor(Math.random() * this.dna.length);
        let randomBase = returnRandBase();
        console.log(randomIndexToChange);
        if (this.dna[randomIndexToChange] !== randomBase){
          this.dna[randomIndexToChange] = randomBase;
        } else {
          console.log(`matched; running mutate again`);
          this.mutate();
        }
        return this.dna;
      },
      willLikelySurvive(){
        let baseCount = this.dna.reduce( (count, base) => {
          count[base] = (count[base] || 0) + 1;
          return count;
        }, {});
        let cAndGTotal = baseCount.C + baseCount.G;
        return cAndGTotal / this.dna.length >= 0.6
      }
    }
  }
  
  let survivingStrands = [];
  let specimenId = 1;
  
  while (survivingStrands.length < 30) {
    let newDNA = pAequorFactory(specimenId, mockUpStrand());
    if (newDNA.willLikelySurvive()) {
      survivingStrands.push(newDNA);
    }
    specimenId++;
  }
  
  console.log(survivingStrands);
  
  