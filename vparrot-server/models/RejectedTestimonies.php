<?php



class rejectedTestimonies {

    private ?int $idRejectedTestimony;
    private ?int $idTestimony;
    private ?string $firstName;
    private ?string $lastName;
    private ?string $content;
    private ?int $rating;

    public function __construct(?int $idRejectedTestimony = null, ?int $idTestimony = null, ?string $firstName = null, ?string $lastName = null, ?string $content = null, ?int $rating = null) {
      
        $this->idRejectedTestimony = $idRejectedTestimony;
        $this->idTestimony = $idTestimony;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->content = $content;
        $this->rating = $rating;  
    }

    //Liste des getters
    public function getIdRejectedTestimony() :int {
        return $this->idRejectedTestimony;
    }

    public function getIdTestimony() :int {
        return $this->idTestimony;
    }

    public function getFirstName() :string {
        return $this->firstName;
    }

    public function getLastName() :string {
        return $this->lastName;
    }

    public function getContent() :string {
        return $this->content;
    }

    public function getRating() :int {
        return $this->rating;
    }

    //Liste des setters
    public function setIdRejectedTestimony($idRejectedTestimony) :void {
        $this->idRejectedTestimony = $idRejectedTestimony;
    }

    public function setIdTestimony($idTestimony) :void {
        $this->idTestimony = $idTestimony;
    }

    public function setFirstName($firstName) :void {
        $this->firstName = $firstName;
    }

    public function setLastName($lastName) :void {
        $this->lastName = $lastName;
    }

    public function setContent($content) :void {
        $this->content = $content;
    }

    public function setRating($rating) :void {
        $this->rating = $rating;
    }

}