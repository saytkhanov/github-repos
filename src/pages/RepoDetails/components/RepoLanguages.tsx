import { FC } from "react";

interface Language {
  name: string;
}

interface RepoLanguagesProps {
  languages: Language[];
}

export const RepoLanguages: FC<RepoLanguagesProps> = ({ languages }) => {
  return (
    <ul>
      {languages.map(lang => (
        <li key={lang.name}>{lang.name}</li>
      ))}
    </ul>
  );
};
