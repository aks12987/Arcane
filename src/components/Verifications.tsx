import { Verification } from "../types";
import { Switch } from "./Switch";

interface Props {
  verifications: Verification[];
  onChange: (v: Verification[]) => void;
}

export const Verifications: React.FC<Props> = ({ verifications, onChange }) => {
  const handleChange = (vIndex: number, cIndex: number, value: boolean) => {
    // const v = structuredClone(verifications);

    // v[vIndex].eligibility.checks[cIndex].passed = value;

    ///------updates------------------
    const v = verifications.map((verification, index) => {
      if (index !== vIndex) return verification;

      return {
        ...verification,
        eligibility: {
          ...verification.eligibility,
          checks: verification.eligibility.checks.map((iCheck, cidx) => {
            if (cidx !== cIndex) return iCheck;
            return { ...iCheck, passed: value };
          }),
        },
      };
    });
    ///------updates------------------
    onChange(v);
  };

  return (
    <>
      {verifications.map((verification, vIndex) => {
        return (
          <div key={vIndex} className="mt-6">
            <div className="text-xs px-3 py-1 bg-white rounded-full mb-1 font-medium text-neutral-400 inline-block">
              {" "}
              Verification Source: {verification.source}
            </div>
            <div className="flex flex-wrap">
              {verification.eligibility.checks.map((condition, cIndex) => {
                ///------updates------------------
                const key = `${verification.source}_${condition.name}_${cIndex}`;
                ///------updates------------------
                return (
                  <div className="p-px w-1/2" key={key}>
                    <div className="flex flex-col bg-white p-4 rounded-lg">
                      <p className="text-sm font-medium text-neutral-700 mb-1 -mt-1">
                        {condition.label}
                      </p>
                      <Switch
                        checked={condition.passed}
                        onChange={() => {
                          handleChange(vIndex, cIndex, !condition.passed);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};
