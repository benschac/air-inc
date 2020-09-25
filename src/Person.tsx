import React from "react";
import { Person as IPerson } from "./mockApi";
import "./person.css";
interface PersonProps {
  person: IPerson;
}

export const Person: React.FC<PersonProps> = ({
  person: { avatar, id, email, name, description },
}) => {
  return (
    <div className="person" key={id}>
      <div className="hed">
        <img alt={name} src={avatar} />
      </div>

      <div className="dek">
        <h3>{name}</h3>
        <p>{description}</p>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
    </div>
  );
};
