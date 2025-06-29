{
  inputs,
  cell,
}: let
  inherit (inputs.std.lib) cfg;
  inherit (inputs.std.data) configs;
  inherit (inputs.std.lib.dev) mkNixago;
  inherit (inputs) nixpkgs;
in {
  # Tool Homepage: https://numtide.github.io/treefmt/
  treefmt =
    (mkNixago cfg.treefmt)
    {
      packages = [
        nixpkgs.alejandra
        nixpkgs.nodePackages.prettier
        nixpkgs.shfmt
      ];

      # see defaults at https://github.com/divnix/std/blob/5ce7c9411337af3cb299bc9b6cc0dc88f4c1ee0e/src/data/configs/treefmt.nix
      data = {
        formatter = {
          nix = {
            command = "alejandra";
            includes = ["*.nix"];
          };
          prettier = {
            command = "prettier";
            options = ["--write"];
            includes = [
              "*.css"
              "*.html"
              "*.js"
              "*.json"
              "*.md"
              "*.mdx"
              "*.jsx"
              "*.scss"
              "*.ts"
              "*.yaml"
            ];
          };
          shell = {
            command = "shfmt";
            options = ["-i" "2" "-s" "-w"];
            includes = ["*.sh"];
          };
        };
      };
    };

  conform = (mkNixago configs.conform) {
    data =
      {inherit (inputs) cells;}
      // {
        commit.conventional.scopes = inputs.std.dmerge.append ["nix"];
      };
  };

  # Tool Homepage: https://github.com/evilmartians/lefthook
  lefthook = (mkNixago configs.lefthook) {
    # see defaults at https://github.com/divnix/std/blob/5ce7c9411337af3cb299bc9b6cc0dc88f4c1ee0e/src/data/configs/lefthook.nix
    data = {};
  };

  just = (mkNixago configs.just) {
    data = {
      tasks = {
        fmt = {
          description = "Formats all changed source files";
          content = ''
            treefmt $(git diff --name-only --cached)
          '';
        };
      };
    };
  };
}
