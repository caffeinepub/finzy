import Array "mo:core/Array";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  // Old record type from old implementation
  type OldSignup = {
    name : Text;
    email : Text;
    timestamp : Time.Time;
  };

  // Old actor definition (uses List for persistent signups)
  type OldActor = {
    signups : List.List<OldSignup>;
  };

  // New record type with phone field added
  type NewSignup = {
    name : Text;
    email : Text;
    phone : Text;
    timestamp : Time.Time;
  };

  // New actor type
  type NewActor = {
    signups : [NewSignup];
  };

  // Migration function: transform OldSignup records to NewSignup with default phone ("")
  public func run(old : OldActor) : NewActor {
    let newSignups = old.signups.toArray().map(
      func(oldSignup) {
        { oldSignup with phone = "" }; // Default phone field to empty string for old records
      }
    );
    { signups = newSignups };
  };
};
